const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const BookingPerson = require("../model/bookingPerson");
require("dotenv").config();



/** Booking person information */
router.get("/", async (req, res) => {
    const PersonInformation = await BookingPerson.find({});
    if (PersonInformation.length > 0) {
      res.send({data: PersonInformation});
    } else {
      res.send({ message: "Not Updated Yet" });
    }
  });

/** add booking person's information */
  router.post("/add", async (req, res) => {
    try {
      const PersonInformation = await BookingPerson.create(req.body);
      if(PersonInformation){
        res.send({message:"Booking Information with customer",code:200,data:PersonInformation});
      }
    } catch (err) {
      console.log(err, "error");
    }
  });
  

  router.get("/:id", async (req, res) => {
    const id = req.params.id
    const singleBookingPerson = await BookingPerson.find({_id: id});
    if (singleBookingPerson.length > 0) {
      res.send({data: singleBookingPerson});
    } else {
      res.send({ message: "Not Updated Yet" });
    }
  });

module.exports = router;
