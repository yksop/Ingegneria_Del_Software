const PORT = 3000; // Change to any available port number

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Middleware
app.use(express.json());

require("dotenv").config();

// Import routes

const usersRoute = require("./app/routes/UserController");
const alertsRoute = require("./app/routes/AlertController");

// Route middleware
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/alerts", alertsRoute);

/**
 * Configure mongoose
 */
// mongoose.Promise = global.Promise;
app.locals.db = mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  });