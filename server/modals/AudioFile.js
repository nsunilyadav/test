const mongoose = require("mongoose");

const AudioFileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("audioFiles", AudioFileSchema);
