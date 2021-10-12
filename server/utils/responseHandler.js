const successHandler = (res, message, result) => {
  res.status(200).json({ message, result });
};

const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong!", error });
};

module.exports = { successHandler, errorHandler };
