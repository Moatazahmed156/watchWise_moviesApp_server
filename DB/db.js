const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("watchWise", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected successfully.");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

module.exports = sequelize;