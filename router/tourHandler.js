const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Tour = require("../model/tour");
require("dotenv").config();

router.get("/upcomeing", async (req, res) => {
  const tour = await Tour.find({ status: "upcomeing" });
  if (tour.length > 0) {
    res.send(tour);
  } else {
    res.send({ message: "data not found" });
  }
});
router.get("/popular", async (req, res) => {
  const tour = await Tour.find({ status: "popular" });
  if (tour.length > 0) {
    res.send(tour);
  } else {
    res.send({ message: "data not found" });
  }
});

module.exports = router;
