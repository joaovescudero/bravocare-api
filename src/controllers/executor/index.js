const httpStatus = require('http-status');
const { QueryTypes } = require('sequelize');

const catchAsync = require('../../utils/catchAsync');
const sequelize = require('../../lib/database');

const Query4 = catchAsync(async (req, res) => {
  const result = await sequelize.query(
    `
      SELECT f.facility_id,
             f.facility_name,
             j.nurse_type_needed,
             SUM(j.total_number_nurses_needed) -
             (SELECT count(*)
              FROM nurses n
                       INNER JOIN public.nurse_hired_jobs nhj
                                  ON n.nurse_id = nhj.nurse_id AND n.nurse_type = j.nurse_type_needed
                       INNER JOIN public.jobs j
                                  ON nhj.job_id = j.job_id AND j.facility_id = f.facility_id) AS remaining_spots
      FROM facilities f
               INNER JOIN jobs j ON f.facility_id = j.facility_id
      GROUP BY f.facility_id, f.facility_name, j.nurse_type_needed
      ORDER BY f.facility_id ASC, j.nurse_type_needed ASC
  `,
    { type: QueryTypes.SELECT },
  );

  return res.status(httpStatus.OK).json(result);
});

const Query5 = catchAsync(async (req, res) => {
  const result = await sequelize.query(
    `
      SELECT n.nurse_id,
             n.nurse_name,
             n.nurse_type,
             COUNT(DISTINCT j.job_id) - COUNT(DISTINCT nhj.job_id) AS remaining_jobs
      FROM nurses n
               JOIN jobs j ON n.nurse_type = j.nurse_type_needed
               LEFT JOIN nurse_hired_jobs nhj ON n.nurse_id = nhj.nurse_id AND j.job_id = nhj.job_id
      WHERE j.total_number_nurses_needed > (SELECT COUNT(DISTINCT nhj3.nurse_id)
                                            FROM nurse_hired_jobs nhj3
                                            WHERE nhj3.job_id = j.job_id)
      GROUP BY n.nurse_id, n.nurse_name, n.nurse_type
      ORDER BY n.nurse_id ASC;
  `,
    { type: QueryTypes.SELECT },
  );

  return res.status(httpStatus.OK).json(result);
});

const Query6 = catchAsync(async (req, res) => {
  const result = await sequelize.query(
    `
      SELECT DISTINCT n2.nurse_name AS co_worker_name
      FROM nurses n
               INNER JOIN nurse_hired_jobs nhj ON n.nurse_id = nhj.nurse_id
               INNER JOIN jobs j ON nhj.job_id = j.job_id
               INNER JOIN jobs j2 ON j.facility_id = j2.facility_id
               INNER JOIN nurse_hired_jobs nhj2 ON j2.job_id = nhj2.job_id
               INNER JOIN nurses n2 ON nhj2.nurse_id = n2.nurse_id
      WHERE n.nurse_name = 'Anne';
  `,
    { type: QueryTypes.SELECT },
  );

  return res.status(httpStatus.OK).json(result);
});

module.exports = {
  Query4,
  Query5,
  Query6,
};
