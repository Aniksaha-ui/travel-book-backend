const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Booking = require("../model/booking");
require("dotenv").config();

// book a tour

router.post("/", async (req, res) => {
  const book = new Booking(req.body);
  const bookingList = await book.save();
  if (bookingList) {
    res.send(bookingList);
  } else {
    res.send({ message: "Data can not be inserted" });
  }
  //   console.log(req.body);
});
module.exports = router;
