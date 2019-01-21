const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userAgent = require("express-useragent");
const where = require("node-where");

const router = require("./routes");

const app = express();

const URI = "mongodb://localhost/short-url";
mongoose.connect(
  URI,
  err => {
    if (err) console.log(err);
    console.log("Connected to DB successfully");
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(userAgent.express());
app.use((req, res, next) => {
  where.is(req.ip, (err, result) => {
    req.geoip = result;
    next();
  });
});

app.use("/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) console.log("Cannot start server");
  console.log(`Listening to port ${PORT}`);
});
