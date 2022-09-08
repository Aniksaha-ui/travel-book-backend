const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Tour = require("../model/tour");
require("dotenv").config();

//upcomeing tour
router.get("/upcomeing", async (req, res) => {
  const tour = await Tour.find(
    { status: "upcomeing" },
    ["name", "availableSeat", "code"],
    {
      sort: { availableSeat: -1 },
    }
  );
  if (tour.length > 0) {
    res.send(tour);
  } else {
    res.send({ message: "data not found" });
  }
});

//popular tour
router.get("/popular", async (req, res) => {
  const tour = await Tour.find({ status: "popular" });
  if (tour.length > 0) {
    res.send(tour);
  } else {
    res.send({ message: "data not found" });
  }
});

//tour description

router.get("/description/:id", async (req, res) => {
  const id = req.params.id;
  const tourDescription = await Tour.find({ _id: id });
  res.send(tourDescription);
});

module.exports = router;
