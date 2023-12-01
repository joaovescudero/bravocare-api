const { parse, differenceInMinutes, min, max, isBefore, addDays } = require('date-fns');

const parseDateTime = (date, time) => parse(`${date}T${time}`, "yyyy-MM-dd'T'HH:mm:ss", new Date());

const calculateOverlapMinutes = (shiftA, shiftB) => {
  const startA = parseDateTime(shiftA.shift_date, shiftA.start_time);
  const startB = parseDateTime(shiftB.shift_date, shiftB.start_time);
  let endA = parseDateTime(shiftA.shift_date, shiftA.end_time);
  endA = isBefore(endA, startA) ? addDays(endA, 1) : endA;
  let endB = parseDateTime(shiftB.shift_date, shiftB.end_time);
  endB = isBefore(endB, startB) ? addDays(endB, 1) : endB;

  const overlapStart = max([startA, startB]);
  const overlapEnd = min([endA, endB]);

  return Math.max(0, differenceInMinutes(overlapEnd, overlapStart));
};

module.exports = {
  calculateOverlapMinutes,
  parseDateTime,
};
