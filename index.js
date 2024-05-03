const PORT = 3000; // Change to any available port number

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Middleware
app.use(express.json());

require("dotenv").config();

// Import routes
const userRoute = require("./app/routes/UserController");

// Route middleware
app.use("/api/v1/users", userRoute);

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
