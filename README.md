MERN Authentication Project

Overview

This is a MERN (MongoDB, Express, React, Node.js) Authentication project that includes user registration, login, authentication using JWT, and logout functionality. The frontend is built with React and TailwindCSS, while the backend is developed using Express and MongoDB.

Start the Client
cd client
cd my-project
npm run dev

The client runs on http://localhost:5173, and this URL is included in the CORS configuration to prevent errors.

Start the Server
cd server
npm run dev

API Routes

Auth Routes

POST /api/auth/register - Register a new user

POST /api/auth/login - Login user and get a token

POST /api/auth/logout - Logout user

user Routes

GET /api/user - Get all users
DELETE /api/user/:id - Delete a user
