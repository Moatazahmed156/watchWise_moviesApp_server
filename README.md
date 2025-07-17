# 🎬 WatchWise - Movie App Backend

Welcome to the **WatchWise** backend! This server-side API is built with **Node.js**, **Express**, and **Sequelize (MySQL)**. It manages users and their favorite movies, and integrates with the **TMDB API** to fetch movie recommendations.

---

## 🚀 Features

- User Signup & Login
- Update User Profile
- Add / Remove Favorite Movies
- Check if a Movie is Favorited by User
- Fetch All Favorites for a User
- Fetch Movie Recommendations from TMDB
- Auto Logging of All Requests

---

## 📦 Tech Stack

- **Node.js**
- **Express**
- **Sequelize** (MySQL)
- **Axios**
- **CORS**
- **dotenv**

---

## 📁 Project Structure

```
.
├── DB/
│   ├── db.js               # Sequelize DB connection
│   ├── users.js            # User model
│   └── favoriteList.js     # Favorite list model
├── logs.txt                # Auto request logger
├── .env                    # Environment variables
├── server.js               # Main Express server and routes
```

---

## 🌐 API Documentation

### 🔐 User Endpoints

| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | `/`                | Server running check      |
| GET    | `/users`           | Get all users             |
| GET    | `/user/:id`        | Get a user by ID          |
| POST   | `/signup`          | Create new user           |
| POST   | `/login`           | Login by email            |

---

### ⭐ Favorite Movies Endpoints

| Method | Endpoint                           | Description                              |
|--------|------------------------------------|------------------------------------------|
| GET    | `/FavoriteMovies/AllUsers`         | Get all favorite movies (all users)      |
| GET    | `/FavoriteMovies/:id`              | Get favorites for a user (by ID)         |
| GET    | `/favorite/:movieId/:userId`       | Check if movie is in user's favorites    |
| POST   | `/addToFav`                        | Add a movie to user's favorites          |
| DELETE | `/deleteFavMovie/:id`              | Delete a movie from user's favorites     |

---

### 🎯 Recommendations Endpoint

| Method | Endpoint                    | Description                            |
|--------|-----------------------------|----------------------------------------|
| GET    | `/recommendations/:userId`  | Get TMDB recommendations for a user    |

---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/watchwise-backend.git
cd watchwise-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root folder:

```
PORT=3000
TMDB_API_KEY=your_tmdb_api_key_here
```

### 4. Start the Server

```bash
node server.js
```

---

## 📝 Logs

All API requests are logged automatically in `logs.txt` with the format:

```
GET /users - 2025-07-17T18:45:30.123Z
```

This helps in monitoring and debugging requests.

---

## 🛠 Database Notes

Make sure your MySQL server is running. Sequelize will sync models automatically on server start. You may customize DB settings in `DB/db.js`.

---

## 📬 Contact

Built with ❤️ by **Moataz Ahmed**  
Connect via [LinkedIn]([https://www.linkedin.com/in/moataz-ahmed-b02438255/])
