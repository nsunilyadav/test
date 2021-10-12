const bcrypt = require("bcrypt");
const { UserModal } = require("../modals");
const { SALT_ROUNDS } = require("./../constants");
const { errorHandler } = require("./../utils/responseHandler");

const addUser = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    await UserModal.create(req.body);
    res.status(200).send({ message: "Sign up successfully" });
  } catch (error) {
    console.log(error);
    errorHandler(res);
  }
};

module.exports = {
  addUser,
};
