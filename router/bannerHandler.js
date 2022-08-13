const e = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Banner = require("../model/banner");
require("dotenv").config();

router.get("/", async (req, res) => {
  const banner = await Banner.find({});
  //   console.log(banner);
  if (banner.length > 0) {
    res.send(banner);
  } else {
    res.send({ message: "data not found" });
  }
});

module.exports = router;
