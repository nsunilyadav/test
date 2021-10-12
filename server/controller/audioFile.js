const { errorHandler } = require("./../utils/responseHandler");
const { AudioFileModal } = require("../modals");

const addAudioFile = async (req, res) => {
  try {
    const { user } = req;
    await AudioFileModal.create({ name: req.file.filename, userId: user._id });
    res.status(201).send({ message: "File added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateAudioFile = async (req, res) => {
  try {
    await AudioFileModal.update(
      { id: req.params.id },
      { $set: { name: req.file.filename } }
    );
    res.status(200).send({ message: "Audio file changed successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAudioFile = async (req, res) => {
  try {
    const { user } = req;
    const data = await AudioFileModal.find({ userId: user._id });
    res.status(200).send({ message: "fetch listing successfully", data: data });
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  addAudioFile,
  updateAudioFile,
  getAudioFile,
};
