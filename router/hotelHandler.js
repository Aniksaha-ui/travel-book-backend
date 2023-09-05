const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Hotel = require("../model/hotel");
require("dotenv").config();

//get all hotel
router.get("/", async (req, res) => {
  const hotel = await Hotel.find({});
  if (hotel.length > 0) {
    res.send({data: hotel});
  } else {
    res.send({ message: "No hotel found" });
  }
});

//add a new hotel
router.post("/add", async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    if(hotel){
      res.send({message:"New hotel added",code:200,data:hotel});
    }
  } catch (err) {
    console.log(err, "error");
  }
});

module.exports = router;
