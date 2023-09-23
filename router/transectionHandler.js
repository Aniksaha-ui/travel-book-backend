const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// const verifyJWT = require("../auth/verifyJWT");
const Tour = require("../model/tour");
const User = require("../model/user");
const Booking = require("../model/booking");
const Transection = require("../model/transection");
const sendMail = require("../utils/nodemailer");
const { TransectionApproveSubject } = require("../utils/emailSubject");
const { TransectionApproveBody } = require("../utils/emailMessage");
require("dotenv").config();

//verify jwt
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader) {
    return res.status(401).send({ message: "UnAuthorized access" });
  }
  const token = authHeader.split(" ")[1];
  // console.log(token, "token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      // console.log(err);
      return res.status(403).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    // console.log(req.decoded);
    next();
  });
}

const verifyAdmin = async (req, res, next) => {
  const requester = req.decoded.email;
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
    // console.log(req.body);
    const transection = await Transection.find({ status: "pending" });
    if (transection.length > 0) {
      res.send({ status: 200, data: transection });
    }
  } catch (err) {}
});

//insert trnx from user
router.post("/", verifyJWT, async (req, res) => {
  try {
    // console.log(req.body, "trnx");
    const authHeader = req.headers.authorization;
    const transection = await Transection.create(req.body);
    const updateTransection = await Booking.updateOne(
      { _id: req.body.bookingId },
      { payment: "pending" }
    );
    res.send({ data: transection, status: 200 });
  } catch (err) {
    // console.log(err);
  }
});

//find a tnx info for update status
router.get("/admin/:id", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const transection = await Transection.find({ _id: id });
    // console.log(transection);
    res.send({ data: transection, status: 200 });
  } catch (err) {
    // console.log(err);
  }
});

/** update after approved or reject trnx */

router.patch("/tour/:id/:tourId", async (req, res) => {
  const { status } = req.body;
  const { id, tourId } = req.params;
  let updateStatus = false;
  try {
    const updateTransection = await Transection.updateOne(
      { _id: id },
      { status: status }
    );

    const findBookId = await Transection.find({ _id: id });
    console.log(findBookId, "111");
    const bookingId = findBookId[0].bookingId;
    const findNoPerson = await Booking.find({ _id: bookingId });
    let numberOfPerson = findNoPerson[0].numberOfPerson;
    let sendStatus = false;
    const updateBookingPaymentStatus = await Booking.updateOne(
      { _id: bookingId },
      { payment: status }
    );

    const updateTourSeat = await Tour.updateOne(
      { _id: tourId },
      { $inc: { availableSeat: -numberOfPerson } }
    );

    if (
      updateTransection.acknowledged == true &&
      updateBookingPaymentStatus.acknowledged == true &&
      updateTourSeat.acknowledged == true
    ) {
      updateStatus = true;
      const sendEmail = await sendMail(
        TransectionApproveSubject,
        TransectionApproveBody,
        findBookId[0].email
      );
      if (!sendEmail) {
        sendStatus = true;
        // res.send({message: "Email Sent successfully"})
      } else {
        sendStatus = false;
        // res.send({message: "Email Sent Not Successfully"})
      }
    }

    res.send({
      updateStatus,
      data: "Update Successfully",
      sendStatus: sendStatus,
      status: 200,
    });
  } catch (err) {
    res.send({ err, status: 500 });
  }
});

/** update after approved or reject trnx */

/** find transection of a user */
router.get("/:email", verifyJWT, async (req, res) => {
  // console.log("hitted");
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
/** find transection of a user */

module.exports = router;
