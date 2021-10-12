const bcrypt = require("bcrypt");
const { UserModal } = require("../modals");
const { errorHandler } = require("./../utils/responseHandler");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let userData = await UserModal.findOne({ email });
    console.log("user data", userData);

    if (!userData) {
      return res
        .status(422)
        .send({ message: "Incorrect username or password." });
    }

    if (!bcrypt.compareSync(password, userData.password)) {
      return res
        .status(422)
        .send({ message: "Incorrect username or password." });
    }

    const token = jwt.sign({ ...userData }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    return res.status(200).send({
      message: "Logged in successfully.",
      token: `Bearer ${token}`,
      expires: new Date().getTime() + 86400,
      expiresIn: 86400,
      details: userData,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  login,
};
