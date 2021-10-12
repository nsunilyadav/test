const express = require("express");
const router = express.Router();
const multer = require("multer");
const constants = require("./../constants");
const { audioFileController } = require("./../controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "../../uploads/");
  },
  filename: function (req, file, cb) {
    if (!file.originalname.match(/\.(mp4|mp3|m4a|wav|wma|aac)$/)) {
      return cb(
        new Error(
          "We support only mp4, mp3, m4a, wav, wma, aac for audio file, Please send proper file format"
        )
      );
    }
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post("/add", upload.single("file"), audioFileController.addAudioFile);
router.post(
  "/update",
  upload.single("file"),
  audioFileController.updateAudioFile
);
router.get("/list", audioFileController.getAudioFile);

module.exports = router;
