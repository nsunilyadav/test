const passport = require("passport");

const validateLogin = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  validateLogin,
};
