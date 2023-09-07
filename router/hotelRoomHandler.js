const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const HotelRooms = require("../model/hotelRoom");
const Hotel = require("../model/hotel");
const Tour = require("../model/tour");

require("dotenv").config();

//get all hotel
router.get("/", async (req, res) => {
  const rooms = await HotelRooms.find({});
  if (rooms.length > 0) {
    res.send({data: rooms, status: 200});
  } else {
    res.send({ message: "No hotel found" });
  }
});

//add a new hotel
router.post("/add", async (req, res) => {
  try {
    const hotel = await HotelRooms.create(req.body);
    if(hotel){
      res.send({message:"New hotel rooms added",status:200,data:hotel});
    }
  } catch (err) {
    console.log(err, "error");
  }
});


router.get("/getById/:id", async (req, res) => {
    const id = req.params.id;
    const hotelSeats = await HotelRooms.find({ tour_id: id }).select({'name':1,'seat_no':1})
    res.send({ data: hotelSeats });
 });


router.get("/getUniqueHotels/:id", async (req, res) => {
  const response = {};
  const id = req.params.id;
  const hotelSeats = await HotelRooms.find({ tour_id: id }).distinct('name');
  response.hotels = hotelSeats;
  response.tour_id = id;
  res.send({ data: response });
});



router.post("/getUniqueRoomNumbers", async (req, res) => {
  const name = req.body.hotelName;
  const tourId = req.body.tourId;
  console.log(name,tourId,"name");
  const hotelSeats = await HotelRooms.find({ name: name,tour_id: tourId }).distinct('roomId')
  res.send({ data: hotelSeats });
});


router.post("/getUniqueSeatNumberByHotelId", async (req, res) => {
  const name = req.body.hotelName;
  const tourId = req.body.tourId;
  const roomId = req.body.roomId;
  const hotelSeats = await HotelRooms.find({ name: name,tour_id: tourId,roomId: roomId }).distinct('seat_no')
  const tourInfo = await Tour.find({_id: tourId}).select({'_id': 1,'name': 1})
  const count = hotelSeats.length;
  const response = {hotelSeats,count} 
  res.send({ hotelSeats: hotelSeats, tourInfo:tourInfo, count,roomId, hotel : name });
});





router.get("/getHotelInformationByName/:hotelName", async (req, res) => {
  const name = req.params.hotelName;
  //I need {name: 'hotel' , room:101, capacity: 3}
  const hotelInformation = await HotelRooms.find({ name : name }).select({'name':1,'roomId':1});
  res.send({ data: hotelInformation });
});



module.exports = router;
