const { body } = require("express-validator");

const loginValidationRule = () => {
  return [body("email").isEmail().notEmpty(), body("password").notEmpty()];
};

module.exports = { loginValidationRule };
