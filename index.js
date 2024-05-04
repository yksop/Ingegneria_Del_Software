const PORT = 3000;

require("dotenv").config(); // TODO: remove this
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const { isLoggedIn } = require("./middlewares/authMiddleware");
const session = require("express-session");
const bodyParser = require("body-parser");

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Import routes
const userRoute = require("./app/routes/UserController");

// Route middleware
app.use("/api/v1/users", userRoute);

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get("/protected", isLoggedIn, (req, res) => {
  res.send("You are authenticated");
});

app.get("/logout", (req, res, next) => {
  if (req.session) {
    req.logOut();
    req.session.destroy();
    res.redirect("/");
  }
});

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
