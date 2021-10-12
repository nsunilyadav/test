const express = require("express");
const router = express.Router();

router.use("/audio-file", require("./upload"));
router.use("/user", require("./user"));
router.use("/auth", require("./auth"));

module.exports = router;
