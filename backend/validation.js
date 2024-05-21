const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const passwordMinLength = 6; // Minimum password length
const usernameMinLength = 6; // Minimun username length

// Register validation
const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    surname: joi.string().required(),
    latitude: joi.number().required(),
    longitude: joi.number().required(),
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
    volunteer: joi
      .object({
        isVolunteer: joi.boolean().optional(),
        acceptedAlert: joi.string().optional(),
        certificateCode: joi.string().optional(),
      })
      .optional(),
    certifier: joi
      .object({
        isCertifier: joi.boolean().optional(),
      })
      .optional(),
    operator118: joi
      .object({
        isOperator118: joi.boolean().optional(),
      })
      .optional(),
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
  const usernameRegex = /^[a-zA-Z0-9_]{6,20}$/; // Username must be between 6 to 20 characters long and can include letters, numbers, and underscores

  // Validate username
  if (!usernameRegex.test(username)) {
    throw new Error(
      "Invalid username. It must be between " +
        usernameMinLength +
        " to 20 characters long and can only contain letters, numbers, and underscores."
    );
  }

  // Validate password
  if (password.length < passwordMinLength) {
    throw new Error(
      "Invalid password. It must be at least " +
        passwordMinLength +
        " characters long."
    );
  }

  // If everything is ok, I return true --> email & password correct!
  return true;
};

// DAE Validation
const daeValidation = (data) => {
  const schema = joi.object({
    latitude: joi.number().required(),
    longitude: joi.number().required(),
    id: joi.number().required(),
    codvia: joi.number().required(),
    desvia: joi.string().required(),
    fumetto: joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.validateLogin = validateLogin;
module.exports.alertValidation = alertValidation;
module.exports.daeValidation = daeValidation;
