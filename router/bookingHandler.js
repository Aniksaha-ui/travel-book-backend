const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Booking = require("../model/booking");
const Tour = require("../model/tour");
const Transection = require("../model/transection");
require("dotenv").config();
// const { verifyJWT } = require("../auth/auth");
// verify jwt
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).send({ message: "UnAuthorized access" });
  }
  const token = authHeader.split(" ")[1];
  console.log(token, "token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      console.log(err);
      return res.status(403).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    console.log(req.decoded);
    next();
  });
}

const verifyAdmin = async (req, res, next) => {
  const requester = req.decoded.email;
  console.log(requester, "decoded");
  const requesterAccount = await User.findOne({ email: requester });
  if (requesterAccount.role === "admin") {
    next();
  } else {
    res.send({ message: "admin forbidden", status: 403 });
  }
};

// book a tour

router.post("/", async (req, res) => {
  console.log(req.body);
  req.body.payment = "no";
  console.log(req.body, "body");
  const book = new Booking(req.body);

  const bookingList = await book.save();
  if (bookingList) {
    res.send(bookingList);
  } else {
    res.send({ message: "Data can not be inserted" });
  }
  //   console.log(req.body);
});

//pending payment tours where payment status is no
router.get("/bookingDetails/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const bookingDetails = await Booking.find({ _id: id, payment: "no" });
  console.log(bookingDetails);
  res.send({ data: bookingDetails });
});

//pending payment tours where payment status is pending
router.get("/pending-booking/:email", verifyJWT, async (req, res) => {
  console.log("hitted");
  const decodedEmail = req.decoded?.email;
  const email = req.params.email;
  if (email === decodedEmail) {
    const bookingList = await Booking.find({
      email: email,
      payment: "pending",
    });
    if (bookingList) {
      console.log(bookingList, "booking list");
      res.send({ data: bookingList });
    } else {
      res.send({ message: "No data found" });
    }
  } else {
    res.status(403).send({ message: "forbidden access" });
  }
});

//yes payment tours
router.get("/upcomeing-booking/:email", verifyJWT, async (req, res) => {
  const decodedEmail = req.decoded?.email;
  const email = req.params.email;
  console.log(email);
  if (email === decodedEmail) {
    const bookingList = await Booking.find({ email: email, payment: "yes" });
    if (bookingList) {
      console.log(bookingList);
      res.send({ data: bookingList });
    } else {
      res.send({ message: "No data found" });
    }
  } else {
    res.status(403).send({ message: "forbidden access" });
  }
});

//for my booking where payement is not done
router.get("/:email", verifyJWT, async (req, res) => {
  const decodedEmail = req.decoded?.email;
  const email = req.params.email;
  console.log(email);
  if (email === decodedEmail) {
    const bookingList = await Booking.find({ email: email, payment: "no" });
    if (bookingList) {
      console.log(bookingList);
      res.send({ data: bookingList });
    } else {
      res.send({ message: "No data found" });
    }
  } else {
    res.status(403).send({ message: "forbidden access" });
  }
});

//invoice of upcomeing tour
router.get("/invoice/:email/:tourId", verifyJWT, async (req, res) => {
  const decodedEmail = req.decoded?.email;
  const email = req.params.email;
  const tourId = req.params.tourId;
  if (email === decodedEmail) {
    const bookingList = await Booking.find({ email: email, tourId: tourId });
    const tourInfo = await Tour.find({ _id: tourId });
    const transectionInfo = await Transection.find({
      tourId: tourId,
      status: "yes",
    });
    if (bookingList) {
      console.log(bookingList);
      res.send({
        bookingList: bookingList,
        tour: tourInfo,
        transection: transectionInfo,
      });
    } else {
      res.send({ message: "No data found" });
    }
  } else {
    res.status(403).send({ message: "forbidden access" });
  }
});

module.exports = router;
