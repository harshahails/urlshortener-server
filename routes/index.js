const express = require("express");
const router = express.Router();
const mainController = require("../controllers");
const pj = require("../package.json");

router.get("/", (req, res) => {
  res.status(200).json({ name: pj.name, version: pj.version });
});

router.post("/", mainController.saveUrl);

router.get("/:code", mainController.getUrl);

module.exports = router;
