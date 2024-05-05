const router = require("express").Router();
const User = require("../models/User");
const { registerValidation } = require("../../validation");
const { validateLogin } = require("../../validation");          // I use {} to extract only the validateLogin property. 
            
// JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
// JWT is widely useful in scenarios like Authorization and Information Exchange, to encypt and securely transmit information between parties.
// Reference: https://jwt.io/introduction 
const jwt = require('jsonwebtoken'); 
const EXPIRAL_AUTH_TIME = "2 days";  


// REGISTRATION
router.post("", async (req, res) => {
  // Validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email exists
  const savedEmail = await User.findOne({ email: req.body.email });
  if (savedEmail) return res.status(400).send("Email already exists");

  // Check if username exists
  const savedUsername = await User.findOne({ username: req.body.username });
  if (savedUsername) return res.status(400).send("Username already exists");

  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

/*
router.get("", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});
*/ 


// LOG-IN --> verb GET of HTTP, so I obtain an existing resource (CRUD operation: Read)
router.get("", async (req, res) => { 
      
  try {
    const username_in = req.body.username;
    const password_in = req.body.password;

    try {
      validateLogin(username_in, password_in);
    }catch (error) {
      console.error(error.message); // Handling the error
      return res.status(400).send(error.message);
    }

    const user = await User.findOne({ username: username_in }); // N.B.: await allows us to write asynchronous code so that it seems synchronous.
    // the execution of the async function is paused until the Promise (here findOne()) became fulfilled (resolved) or rejected.

    // Worst case: User NOT found
    if (!user) {
      // HTTP error 401: indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
      return res.status(401).send("Authentication Failed: User not Found");
    }

    // Worst case: PWD do not match
    if (user.password != password_in) {
      return res.status(401).send("Authentication Failed: Password Uncorrect");
    }

    // Better case: User found and password is correct
    // I generate a JWT token to securely transfer encrypted data between client and server. Client could also reuse this token to authenticate subsequent requests to the server.
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: EXPIRAL_AUTH_TIME,
    }); // payload, secret, options

    // I send an HTTP response to the client with status 200 (request has succeeded) and the token in JSON format
    res.status(200).json({ token }); // Convenient and powerful way to handle HTTP responses in Express
  }catch (error){
    // the server encountered an unexpected condition that prevented it from fulfilling the request. So I send the error message.
    res.status(500).send(error.message);
  }
});


router.get("/:id/Users", async (req, res) => {  // I use the parameter :id of the Alert to get the user with that specific id
  // dato id dell'Alert, prendo il raggio

  // avendo il raggio, restituire tutti gli utenti che si trovano in quel raggio
  
});

module.exports = router; // Export the router
