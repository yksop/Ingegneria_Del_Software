const router = require("express").Router();
const User = require("../models/User");
const { registerValidation } = require("../../validation");
const { validateLogin } = require("../../validation");          // I use {} to extract only the validateLogin property. 
const Alert = require("../models/Alert"); 


// JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
// JWT is widely useful in scenarios like Authorization and Information Exchange, to encypt and securely transmit information between parties.
// Reference: https://jwt.io/introduction
const jwt = require("jsonwebtoken");
const EXPIRAL_AUTH_TIME = "2 days";

// REGISTRATION
router.post("", async (req, res) => {
  try {
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
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
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

    const userToLogin = await User.findOne({ username: username_in }); // N.B.: await allows us to write asynchronous code so that it seems synchronous.
    // the execution of the async function is paused until the Promise (here findOne()) became fulfilled (resolved) or rejected.

    // Worst case: User NOT found
    if (!userToLogin) {
      // HTTP error 401: indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
      return res.status(401).send("Authentication Failed: User not Found");
    }

    // Worst case: PWD do not match
    if (userToLogin.password != password_in) {
      return res.status(401).send("Authentication Failed: Password Uncorrect");
    }

    // Better case: User found and password is correct
    // I generate a JWT token to securely transfer encrypted data between client and server. Client could also reuse this token to authenticate subsequent requests to the server.
    const token = jwt.sign({ userId: userToLogin._id }, process.env.JWT_SECRET, {
      expiresIn: EXPIRAL_AUTH_TIME,
    }); // payload, secret, options

    // I send an HTTP response to the client with status 200 (request has succeeded) and the token in JSON format
    res.status(200).json({ token }); // Convenient and powerful way to handle HTTP responses in Express
  }catch (error){
    // the server encountered an unexpected condition that prevented it from fulfilling the request. So I send the error message.
    res.status(500).send(error.message);
  }
});


router.get("/:id/users", async (req, res) => { // Given an Alert id, I want to get all the users that are in the radius of that Alert
  // Find the Alert with the given id
  const alert = await Alert.findById(req.params.id);

  // If the Alert does not exist, return an error
  if (!alert) return res.status(404).send("Alert not found");

  // If the Alert is not active, return an error
  if (!alert.isActive) return res.status(400).send("Alert is not active");

  // Extract the latitude and longitude of the Alert
  const alertLatitude = alert.latitude;
  const alertLongitude = alert.longitude;

  // Extract the radius of the Alert
  const alertRadius = alert.radius;
  
  // Find all the users that are in the radius of the Alert
  const users = await User.find({
    latitude: { $gte: alertLatitude - alertRadius, $lte: alertLatitude + alertRadius },
    longitude: { $gte: alertLongitude - alertRadius, $lte: alertLongitude + alertRadius },
  });

  // Return the users in the radius of the Alert
  return res.send(users);

  // N.B.: $gte and $lte are MongoDB operators that mean "greater than or equal" and "less than or equal" respectively.
  // $gte: alertLatitude - alertRadius means "greater than or equal to the latitude of the Alert minus the radius of the Alert".
  // $lte: alertLatitude + alertRadius means "less than or equal to the latitude of the Alert plus the radius of the Alert".
  // If the Alert is at latitude 10 and longitude 20, and the radius is 5, the latitude range is [5, 15] and the longitude range is [15, 25].   
});

module.exports = router; // Export the router




/*
// Example of data in the DB

adb_03_id: 6637f1c6ee4ade22e1aaadee     // centrato in [10,10]
adb_04_id: 6637f2adcaf8bc5d36868ed1     // centrato in [11,11]
adb_05_id: 6637f2ee00fb12a0b6f57216     // centrato in [15,15]
adb_06_id: 6637f323b09c7fdd6b704f62     // centrato in [16,16]

alert_03_id: 6637f2070299deea1140355a  // centrato in [11,11] con raggio 5
alert_04_id: 66388bfc7d4802a47bcfd755  // centrato in [15,15] con raggio 2 
alert_05_id: 66388e52b966c2520554540c  // centrato in [12,12] con raggio 3

*/
