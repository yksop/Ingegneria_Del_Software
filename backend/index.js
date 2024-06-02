const PORT = 3000; // Change to any available port number

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Middleware
app.use(express.json());

app.use(cors());

require("dotenv").config();

// Import routes
const usersRoute = require("./app/routes/UserController");
const alertsRoute = require("./app/routes/AlertController");
const authenticationRoute = require("./app/routes/Authentication");
const mailRoute = require("./app/middlewares/mailMiddleware");
const passwordRoute = require("./app/routes/PasswordController");

// Route middleware
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/alerts", alertsRoute);
app.use("/api/v1/tokens", authenticationRoute);
app.use("/api/v1/emails", mailRoute);
app.use("/api/v1/passwords", passwordRoute);

/**
 * Configure mongoose

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
