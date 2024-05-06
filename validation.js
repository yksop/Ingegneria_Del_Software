const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const passwordMinLength = 6;          // Minimum password length
const usernameMinLength = 6;          // Minimun username length

// Register validation
const registerValidation = (data) => {
  const schema = joi.object({
    latitude: joi.number().required(),
    longitude: joi.number().required(),
    name: joi.string().min(6).required(),
    surname: joi.string().min(6).required(),
    username: joi.string().min(usernameMinLength).required(),
    email: joi.string().min(6).required().email(),
    password: joiPassword
      .string()
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .minOfSpecialCharacters(1)
      .noWhiteSpaces()
      .min(passwordMinLength)
      .required(),
  });
  return schema.validate(data);
};

// Alert Validation
const alertValidation = (data) => {
  const schema = joi.object({
    latitude: joi.number().required(),
    longitude: joi.number().required(),
    triage: joi.number().min(1).max(5).required(),
    radius: joi.number().min(1).required(),
    expiresIn: joi.number().required(),
    isActive: joi.boolean().required(),
    description: joi.string(),
    timeForAmbulance: joi.number(),
  });
  return schema.validate(data);
};

// Login validation
const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(data);
};


// Login validation 
const validateLogin = (username, password) => {
  // Define rules
  const usernameRegex = /^[a-zA-Z0-9_]{6,20}$/;       // Username must be between 6 to 20 characters long and can include letters, numbers, and underscores
  
  // Validate username
  if (!usernameRegex.test(username)) {
    throw new Error("Invalid username. It must be between " + usernameMinLength + " to 20 characters long and can only contain letters, numbers, and underscores.");
  }
  
  // Validate password
  if (password.length < passwordMinLength) {
    throw new Error("Invalid password. It must be at least " + passwordMinLength + " characters long.");
  }

  // If everything is ok, I return true --> email & password correct!
  return true;
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.validateLogin = validateLogin;
module.exports.alertValidation = alertValidation;
