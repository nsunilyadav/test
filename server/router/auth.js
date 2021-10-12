const express = require("express"),
  router = express.Router(),
  { authController } = require("../controller"),
  { loginValidation } = require("./../validation/"),
  { validateValidation } = require("../middleware/validateValidation");

router.post(
  "/login",
  loginValidation.loginValidationRule(),
  validateValidation,
  authController.login
);
module.exports = router;
