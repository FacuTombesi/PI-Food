const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('diet', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
  },
    name: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false
    }
  }, { timestamps: false });
};
