module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Facility',
    {
      facility_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      facility_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'facilities',
      schema: 'public',
      timestamps: false,
    },
  );
};
