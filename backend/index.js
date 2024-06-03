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
const daeRoute = require("./app/routes/DAEController");
const clinicRoute = require("./app/routes/ClinicController");
const hospitalRoute = require("./app/routes/HospitalController");
const bestPractises = require("./app/routes/BestPractisesController");

// Route middleware
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/alerts", alertsRoute);
app.use("/api/v1/tokens", authenticationRoute);
app.use("/api/v1/emails", mailRoute);
app.use("/api/v1/passwords", passwordRoute);
app.use("/api/v1/daes", daeRoute);
app.use("/api/v1/clinics", clinicRoute);
app.use("/api/v1/hospitals", hospitalRoute);
app.use("/api/v1/bestpractises", bestPractises);

/**
 * Configure mongoose

/**
 * Configure mongoose
 */
// mongoose.Promise = global.Promise;
app.locals.db = mongoose.connect(process.env.DB_CONNECT, {}).then(() => {
  console.log("Connected to Database");

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
