const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

// Register validation
const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    surname: joi.string().required(),
    username: joi.string().required(),
    email: joi.string().min(6).required().email(),
    password: joiPassword
      .string()
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .minOfSpecialCharacters(1)
      .noWhiteSpaces()
      .min(6)
      .required(),
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

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
