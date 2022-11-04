const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Booking = require("../model/booking");
require("dotenv").config();

//verify jwt
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
  const book = new Booking(req.body);
  const bookingList = await book.save();
  if (bookingList) {
    res.send(bookingList);
  } else {
    res.send({ message: "Data can not be inserted" });
  }
  //   console.log(req.body);
});

router.get("/bookingDetails/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const bookingDetails = await Booking.find({ _id: id });
  console.log(bookingDetails);
  res.send({ data: bookingDetails });
});

router.get("/:email", verifyJWT, async (req, res) => {
  const decodedEmail = req.decoded?.email;
  const email = req.params.email;
  console.log(email);
  if (email === decodedEmail) {
    const bookingList = await Booking.find({ email: email, completed: "no" });
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

module.exports = router;
