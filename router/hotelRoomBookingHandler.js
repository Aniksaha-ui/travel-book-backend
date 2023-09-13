const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const HotelRoomBooking = require("../model/hotelRoomBooking");
require("dotenv").config();

//get all assign seat
router.get("/", async (req, res) => {
  const assignHotelRoom = await HotelRoomBooking.find({});
  if (assignHotelRoom.length > 0) {
    res.send({data: assignHotelRoom});
  } else {
    res.send({ message: "Not Updated Yet" });
  }
});

//add new assign seat
router.post("/add", async (req, res) => {
  try {
    const assignHotelRoom = await HotelRoomBooking.create(req.body);
    if(assignHotelRoom){
      res.send({message:"Assign Seat Successfully",code:200,data:assignHotelRoom});
    }
  } catch (err) {
    console.log(err, "error");
  }
});

//get assign seat by bookingId
router.get("/:bookingId", async (req, res) => {
  const id = req.params.bookingId;
 
  const reportOfBooking = await HotelRoomBooking.find({booking_id: id});
  if (reportOfBooking.length > 0) {
    res.send({message:"Assign Seat Successfully",code:200,data: reportOfBooking});
  } else {
    res.send({ message: "Not Updated Yet" });
  }
});



module.exports = router;
