module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Job',
    {
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      facility_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nurse_type_needed: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      total_number_nurses_needed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'jobs',
      schema: 'public',
      timestamps: false,
    },
  );
};
