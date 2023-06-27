const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Hotel = require("../model/hotel");
require("dotenv").config();

//get all hotel
router.get("/", async (req, res) => {
  const hotel = await Hotel.find({});
  if (hotel.length > 0) {
    res.send(hotel);
  } else {
    res.send({ message: "No hotel found" });
  }
});

//add a new hotel
router.post("/", async (req, res) => {
  try {
    console.log(req.body, "assa");
    const hotel = await Hotel.create(req.body);
    res.send(hotel);
  } catch (err) {
    console.log(err, "error");
  }
});

module.exports = router;
