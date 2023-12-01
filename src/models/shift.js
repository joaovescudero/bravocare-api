module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Shift',
    {
      shift_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      facility_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Facility',
          key: 'facility_id',
        },
      },
      shift_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'question_one_shifts',
      schema: 'public',
      timestamps: false,
    },
  );
};
