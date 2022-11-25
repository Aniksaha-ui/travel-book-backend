const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// const verifyJWT = require("../auth/verifyJWT");
const Tour = require("../model/tour");
const User = require("../model/user");
const Booking = require("../model/booking");
const Transection = require("../model/transection");
require("dotenv").config();

//verify jwt
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
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

//get all transection admin route
router.get("/", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const query = {};
    const transection = await Transection.find({ status: "pending" });
    if (transection.length > 0) {
      res.send({ status: 200, data: transection });
    }
  } catch (err) {}
});

//create admin route
router.post("/", verifyJWT, async (req, res) => {
  try {
    console.log("hitted");
    const authHeader = req.headers.authorization;
    const transection = await Transection.create(req.body);
    res.send({ data: transection, status: 200 });
  } catch (err) {
    console.log(err);
  }
});

//find a tnx info for update status
router.get("/admin/:id", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const transection = await Transection.find({ _id: id });
    console.log(transection);
    res.send({ data: transection, status: 200 });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/tour/:id/:tourId", async (req, res) => {
  // need booking id in transection collection

  console.log("hitted");
  const { status } = req.body;
  const { id, tourId } = req.params;
  let updateStatus = false;
  // console.log(status);
  try {
    // const booking = await Booking.find({ _id: bookingId });
    // const { numberOfPerson } = booking[0];
    // console.log(id, "transection id");
    // console.log(tourId, "tourid");
    // console.log(numberOfPerson, "nop");
    const updateTransection = await Transection.updateOne(
      { _id: id },
      { status: status }
    ); //ache

    const findBookId = await Transection.find({ _id: id });
    const bookingId = findBookId[0].bookingId;
    // console.log(bookingId, "bookingId");
    const findNoPerson = await Booking.find({ _id: bookingId });
    let numberOfPerson = findNoPerson[0].numberOfPerson;
    // console.log(numberOfPerson, "person");
    const updateBookingPaymentStatus = await Booking.updateOne(
      { _id: bookingId },
      { payment: status }
    ); //new
    const updateTourSeat = await Tour.updateOne(
      { _id: tourId },
      { $inc: { availableSeat: -numberOfPerson } }
    );
    console.log(updateTourSeat);
    if (
      updateTransection.acknowledged == true &&
      updateBookingPaymentStatus.acknowledged == true &&
      updateTourSeat.acknowledged == true
    ) {
      updateStatus = true;
    }
    res.send({ updateStatus, data: "Update Successfully", status: 200 });
  } catch (err) {
    res.send({ err, status: 500 });
  }
});

//find transection of a user
router.get("/:email", verifyJWT, async (req, res) => {
  console.log("hitted");
  const decodedEmail = req.decoded?.email;
  const email = req.params.email;
  if (email === decodedEmail) {
    const transection = await Transection.find({ email: email });
    if (transection.length > 0) {
      res.send({ status: 200, data: transection });
    } else {
      res.send({ status: 204, data: "No data found" });
    }
  } else {
    res.status(403).send({ message: "forbidden access" });
  }
});

//invoice
// router.get("/invoice/:email", async (req, res) => {
//   try {
//     const email = req.params.email;
//     const transection = await Transection.find({ email: email });
//     const booking = await Booking.find({ email: email, completed: "no" });
//     const subTotal = await Booking.aggregate([
//       {
//         $match: { email: email, completed: "no" },
//       },
//       {
//         $group: {
//           _id: "$tourName",
//           price: { $sum: "$price" },
//           numberOfPerson: { $sum: "$numberOfPerson" },
//         },
//       },
//     ]);

//     // console.log(tourName);
//     res.send({
//       status: 200,
//       booking: booking,
//       transection: transection,
//       subTotal: subTotal,
//     });
//   } catch (err) {}
// });

module.exports = router;
