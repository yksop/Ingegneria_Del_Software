const jwt = require("jsonwebtoken");

function verifyToken(validate) {
  return function (req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader == "undefined") {
      return res.status(403).send("Auth token is undefined\n");
    }
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).send("Invalid auth token: " + err + "\n");
      }
      if (validate && typeof validate === "function" && !validate(authData)) {
        return res.status(403).send("Invalid auth token data\n");
      }
      req.authData = authData;
      next();
    });
  };
}

module.exports = verifyToken;
