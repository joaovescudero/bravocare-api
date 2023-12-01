module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'NurseHiredJob',
    {
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nurse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: 'nurse_hired_jobs',
      schema: 'public',
      timestamps: false,
    },
  );
};
