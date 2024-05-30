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
        isAvailable: joi.boolean().optional(),
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
    emergency: joi.number().min(1).max(17).required(),
    expiresIn: joi.number().required(),
    isActive: joi.boolean().required(),
    description: joi.string(),
    timeForAmbulance: joi.number(),
  });
  return schema.validate(data);
};

// Login validation
const validateLogin = (data) => {
  const schema = joi.object({
    username: joi.string().min(usernameMinLength).required(),
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

const clinicValidation = (data) => {
  const schema = joi.object({
    latitude: joi.number().required(),
    longitude: joi.number().required(),
    civico_num: joi.number().optional(),
    civico_let: joi.string().optional(),
    civico_alf: joi.string().optional(),
    desvia: joi.string().required(),
    strada: joi.number().required(),
    fumetto: joi.string().required(),
  });
  return schema.validate(data);
}

const hospitalValidation = (data) => {
  const schema = joi.object({
    latitude: joi.number().required(),
    longitude: joi.number().required(),
    nome: joi.string().required(),
    tipo: joi.string().required(),
    via: joi.string().required(),
    civico: joi.number().optional(),
  });
  return schema.validate(data);
}

const changeCredentialValidation = (data) => {
  return validateLogin(data);
};

module.exports.registerValidation = registerValidation;
module.exports.validateLogin = validateLogin;
module.exports.alertValidation = alertValidation;
module.exports.daeValidation = daeValidation;
module.exports.clinicValidation = clinicValidation;
module.exports.hospitalValidation = hospitalValidation;
module.exports.changeCredentialValidation = changeCredentialValidation;
