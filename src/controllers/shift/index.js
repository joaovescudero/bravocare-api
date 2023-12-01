const httpStatus = require('http-status');

const { Shift, Facility } = require('../../models');
const { calculateOverlapMinutes } = require('./utils');
const catchAsync = require('../../utils/catchAsync');

const SAME_FACILITY_MAXIMUM_OVERLAP_MINUTES = 30;
const OTHER_FACILITY_MAXIMUM_OVERLAP_MINUTES = 0;

const getAll = catchAsync(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const shifts = await Shift.findAndCountAll({
    offset: (page - 1) * limit,
    limit,
    include: {
      model: Facility,
      as: 'facility',
    },
  });
  return res.status(httpStatus.OK).send(shifts);
});

const calculateOverlap = catchAsync(async (req, res) => {
  const { shift_a_id: shiftAId, shift_b_id: shiftBId } = req.query;

  const shifts = await Shift.findAll({
    where: {
      shift_id: [shiftAId, shiftBId],
    },
    raw: true,
  });
  const shiftA = shifts.find((shift) => shift.shift_id === parseInt(shiftAId, 10));
  const shiftB = shifts.find((shift) => shift.shift_id === parseInt(shiftBId, 10));

  const overlapMinutes = calculateOverlapMinutes(shiftA, shiftB);
  const maxOverlapThreshold =
    shiftA.facility_id === shiftB.facility_id
      ? SAME_FACILITY_MAXIMUM_OVERLAP_MINUTES
      : OTHER_FACILITY_MAXIMUM_OVERLAP_MINUTES;
  const exceedsThreshold = overlapMinutes > maxOverlapThreshold;

  return res.status(httpStatus.OK).json({
    overlapMinutes,
    maxOverlapThreshold,
    exceedsThreshold,
  });
});

module.exports = {
  getAll,
  calculateOverlap,
};
