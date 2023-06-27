const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Followers = require("../model/followers");
require("dotenv").config();

//post followers

router.post("/", async (req, res) => {
  try {
    // console.log("hitted on followers");
    const followers = await Followers.create(req.body);
    console.log(followers);
    res.send({ message: "follower added successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/all-follower-list", async (req, res) => {
  try {
    const followerList = await Followers.find({});
    res.send(followerList);
  } catch (err) {
    res.send({ err });
  }
});

module.exports = router;
