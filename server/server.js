const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  routers = require("./router"),
  dotenv = require("dotenv");
dotenv.config();

(async () => {
  try {
    const app = express();
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(__dirname + "/uploads"));
    app.use(routers);
    await mongoose.connect(process.env.DATABASE_URL);
    app.listen(process.env.PORT);
  } catch (error) {
    console.error("Some thing went wrong: ", error);
    process.exit(1);
  }
})();
