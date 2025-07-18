const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
  type: DataTypes.STRING,
  allowNull: false,
  }
});

module.exports = Users;
