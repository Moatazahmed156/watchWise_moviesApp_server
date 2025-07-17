# 🎬 WatchWise - Movie App Backend

Welcome to the **WatchWise** backend! This is the server-side API built with **Node.js**, **Express**, and **Sequelize (MySQL)** for managing users and their favorite movies, including fetching recommendations from TMDB.

---

## 🚀 Features

- ✅ User Signup & Login
- ✅ Update user profile
- ✅ Add/remove favorite movies
- ✅ Get all favorites for a user
- ✅ Check if a movie is in a user's favorites
- ✅ Get movie recommendations (via TMDB API)
- ✅ Centralized logger middleware to track API calls

---

## 📦 Technologies Used

- **Node.js**
- **Express**
- **Sequelize (MySQL)**
- **Axios**
- **dotenv**
- **CORS**
- **TMDB API**

---

## 🏗️ Project Structure

├── DB/
│ ├── db.js # Sequelize DB connection
│ ├── users.js # Users model
│ └── favoriteList.js # Favorite movies model
├── logs.txt # Auto-generated request logs
├── .env # Environment variables
├── server.js # Main server file (API logic)
