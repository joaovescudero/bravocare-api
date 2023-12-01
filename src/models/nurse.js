module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Nurse',
    {
      nurse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nurse_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      nurse_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'nurses',
      schema: 'public',
      timestamps: false,
    },
  );
};
