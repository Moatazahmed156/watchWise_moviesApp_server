const express = require("express");
const db = require("./DB/db");
const cors = require("cors");
const Users = require("./DB/users");
const FavoriteMovies = require("./DB/favoriteList");
const fs = require("fs");
const axios = require('axios');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
require("dotenv").config();
// Logger Middleware
app.use((req, res, next) => {
  const log = `${req.method} ${req.url} - ${new Date().toISOString()}`;
  console.log(log);
  fs.appendFile("logs.txt", log + "\n", (err) => {
    if (err) console.error("Error writing log:", err);
  });
  next();
});

// ================= USERS =================

app.get("/users", async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/signup", async (req, res) => {
  const { name, email } = req.body;
  try {
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const newUser = await Users.create({ name, email });
    res.status(201).json({ message: "Signup successful", newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Login successful" ,  user});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= FAVORITE MOVIES =================

app.get("/FavoriteMovies/AllUsers", async (req, res) => {
  try {
    const allFavMovies = await FavoriteMovies.findAll();
    res.status(200).json(allFavMovies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/FavoriteMovies/:id", async (req, res) => {
  try {
  const userMovies = await FavoriteMovies.findAll({
    where: { userId: req.params.id },
    order: [['createdAt', 'DESC']], 
  });
  res.status(200).json(userMovies);
} catch (err) {
  res.status(500).json({ error: err.message });
}

});
app.get("/favorite/:movieId/:userId", async (req, res) => {
  const { movieId, userId } = req.params;

  try {
    const favorite = await FavoriteMovies.findOne({
      where: {
        movieId,
        userId,
      },
    });
    if (favorite) {
      res.status(200).json({
        isFavorite: true,
        data: favorite,
      });
    } else {
      res.status(200).json({
        isFavorite: false,
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/recommendations/:userId", async (req, res) => {
  const { userId } = req.params;
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  try {
    const favorites = await FavoriteMovies.findAll({ where: { userId } });
    const movieIds = favorites.map(fav => fav.movieId).reverse();
    const recommendedMap = new Map();
    for (const id of movieIds) {
      let tmdbId = null;
      try {
        if (id.startsWith("tt")) {
          const findRes = await axios.get(`https://api.themoviedb.org/3/find/${id}`, {
            params: {
              api_key: TMDB_API_KEY,
              external_source: "imdb_id",
            },
          });
          const movieResult = findRes.data.movie_results[0];
          if (!movieResult) {
            console.warn(`No TMDB match found for IMDb ID ${id}`);
            continue;
          }
          tmdbId = movieResult.id;
        } 
        else if (!isNaN(id)) {
          tmdbId = id;
        } else {
          console.warn(`Invalid movie ID format: ${id}`);
          continue;
        }
        const recRes = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/recommendations`, {
          params: {
            api_key: TMDB_API_KEY,
            language: "en-US",
          },
        });
        recRes.data.results.forEach(movie => {
          if (!recommendedMap.has(movie.id)) {
            recommendedMap.set(movie.id, movie);
          }
        });
      } catch (err) {
        console.warn(`Failed to fetch recommendations for ID=${id}:`, err.response?.status || err.message);
      }
    }
    res.status(200).json(Array.from(recommendedMap.values()));
  } catch (err) {
    console.error("Recommendation error:", err.message);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});



app.post("/addToFav", async (req, res) => {
  const { userId, movieId } = req.body;

  if (!userId || !movieId) {
    return res.status(400).json({ message: "userId and movieId are required" });
  }

  try {
    const existing = await FavoriteMovies.findOne({ where: { userId, movieId } });
    if (existing) {
      return res.status(200).json({ message: "Movie already in favorites" });
    }

    const newFav = await FavoriteMovies.create({ userId, movieId });
    res.status(201).json({ message: "Movie added to favorites", data: newFav });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/deleteFavMovie/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await FavoriteMovies.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= SERVER =================

app.listen(PORT, async () => {
  await db.sync({ force: false, alter: true });
  console.log("The table for the User model was just created!");
  console.log(`Server is running on port ${PORT}`);
});
