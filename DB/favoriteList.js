const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const Users = require("./users");

const FavoriteMovies = sequelize.define(
  "FavoriteMovies",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "movieID"],
      },
    ],
  }
);

// Relationships
Users.hasMany(FavoriteMovies, {
  foreignKey: "userId",
});
FavoriteMovies.belongsTo(Users, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = FavoriteMovies;
