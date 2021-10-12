const express = require("express"),
  router = express.Router(),
  { userController } = require("../controller");

router.post("/add", userController.addUser);
module.exports = router;
