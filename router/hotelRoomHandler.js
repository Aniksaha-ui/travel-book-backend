const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const HotelRooms = require("../model/hotelRoom");
const Hotel = require("../model/hotel");
const Tour = require("../model/tour");
const Booking = require('../model/booking');
const BookingPerson = require("../model/bookingPerson");
const nodemailer = require("nodemailer");
// const {  sendMail } = require("../utils/nodemailer");
const helloWorld = require("../utils/nodemailer");
const sendMail = require("../utils/nodemailer");
const { NotFillApplicationBody} = require("../utils/emailMessage")
const { NotFillApplicationSubject} = require("../utils/emailSubject")

require("dotenv").config();

/** get all hotel */
router.get("/", async (req, res) => {
  const rooms = await HotelRooms.find({});
  if (rooms.length > 0) {
    res.send({data: rooms, status: 200});
  } else {
    res.send({ message: "No hotel found" });
  }
});

 /**Hotel room setup adding */
router.post("/add", async (req, res) => {
    try {
      console.log(req.body.capacity,"capacity");
      let capacity  = parseInt(req.body.capacity)
      for(let i=0;i<capacity;i++){
          const obj = {
            hotel_id: req.body.hotel_id,
            name: req.body.name,
            address: req.body.address,
            capacity : capacity || 0,
            roomId : req.body.roomId,
            seat_no: i+1,
            tour_id: ''
          }
          const hotel = await HotelRooms.create(obj);
      }

        res.send({message:"New hotel rooms added",status:200});
    
      } catch (err) {
      console.log(err, "error");
    }
  });
  

/** get hotel by tour id */
router.get("/getById/:id", async (req, res) => {
    const id = req.params.id;
    const hotelSeats = await HotelRooms.find({ tour_id: id }).select({'name':1,'seat_no':1})
    res.send({ data: hotelSeats });
 });


/**get unique hotel by tour id */
router.get("/getUniqueHotels/:id", async (req, res) => {
  const response = {};
  const id = req.params.id;
  const hotelSeats = await HotelRooms.find({ tour_id: id }).distinct('name');
  response.hotels = hotelSeats;
  response.tour_id = id;
  res.send({ data: response });
});


/** get unique room numbers by hotelname and tourId */
router.post("/getUniqueRoomNumbers", async (req, res) => {
  const name = req.body.hotelName;
  const tourId = req.body.tourId;
  console.log(name,tourId,"name");
  const hotelSeats = await HotelRooms.find({ name: name,tour_id: tourId }).distinct('roomId')
  res.send({ data: hotelSeats });
});


/** get booking list of a tour by tourId */
router.post("/getBookingListByTourId", async (req, res) => {
  const tourId = req.body.tourId;
  const bookingIdList = await Booking.find({ tourId: tourId }).distinct('_id')
  const response = {bookingIdList: bookingIdList} 
  res.send({ bookingList: bookingIdList });
});


/** get unique seat number by name,tourId and roomId and bookingId*/
router.post("/getUniqueSeatNumberByHotelId", async (req, res) => {
  const name = req.body.hotelName;
  const tourId = req.body.tourId;
  const roomId = req.body.roomId;
  const bookingId = req.body.bookingId;
  const personListInfo = await BookingPerson.find({booking_id: bookingId}).select({persons:1})
  const personList = personListInfo.length > 0 ? personListInfo[0].persons : [];
  const hotelSeats = await HotelRooms.find({ name: name,tour_id: tourId,roomId: roomId }).distinct('seat_no')
  const tourInfo = await Tour.find({_id: tourId}).select({'_id': 1,'name': 1})
  const count = hotelSeats.length;
  res.send({ hotelSeats: hotelSeats, personList:personList, tourInfo:tourInfo, count,roomId, hotel : name });
});


/** get hotel information by hotelName */
router.get("/getHotelInformationByName/:hotelName", async (req, res) => {
  const name = req.params.hotelName;
  //I need {name: 'hotel' , room:101, capacity: 3}
  const hotelInformation = await HotelRooms.find({ name : name }).select({'name':1,'roomId':1});
  res.send({ data: hotelInformation });
});


/** hotel tour update */
router.post("/assignHotelForTour",async (req, res) =>{
  console.log(req,"req");
  const filter = { hotel_id: req.hotelId };
  const update = { tour_id: req.tourId };
  console.log(req.hotelId, req.tour_id,"hotel & tour");
  let doc = await HotelRooms.updateMany({hotel_id: req.body.hotelId}, { $set: { tour_id: req.body.tourId } },{multi:true});
  if(doc.acknowledged===true){
    res.send({message: `Booking Hotel Successfull for the tour ${req.hotelId}`});
  }else{
    res.send({code: 400, message: "Bad Request"});
  }

})


/**email send for not fillup form*/
router.get("/mail-send",async(req,res)=>{
    const sendEmail = await sendMail(NotFillApplicationSubject,NotFillApplicationBody,"sahaanik1048@gmail.com");
    if(!sendEmail){
      res.send({message: "Email Sent successfully"})
    }else{
      res.send({message: "Email Sent Not Successfully"})
    }
});



module.exports = router;
