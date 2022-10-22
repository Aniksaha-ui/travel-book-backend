const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// const verifyJWT = require("../auth/verifyJWT");
const Tour = require("../model/tour");
require("dotenv").config();

//verify jwt
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "UnAuthorized access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
};

//upcomeing tour
router.get("/upcomeing", async (req, res) => {
  console.log(Tour);
  const tour = await Tour.find({ status: "upcomeing" });
  if (tour.length > 0) {
    res.send(tour);
  } else {
    res.send({ message: "data not found" });
  }
});

//popular tour
router.get("/popular", async (req, res) => {
  const tour = await Tour.find({ status: "popular" });
  if (tour.length > 0) {
    res.send(tour);
  } else {
    res.send({ message: "data not found" });
  }
});

//tour description

router.get("/description/:id", async (req, res) => {
  const id = req.params.id;
  const tourDescription = await Tour.find({ _id: id });
  res.send(tourDescription);
});

router.post("/add-tour", verifyJWT, async (req, res) => {
  try {
    req.body.include = [req.body.include];
    req.body.notInclude = [req.body.notInclude];
    console.log(req.body);

    const data = await Tour.create(req.body);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
