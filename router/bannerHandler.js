const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Banner = require("../model/banner");
const Blog = require("../model/blog");
require("dotenv").config();

router.get("/", async (req, res) => {
  const banner = await Banner.find({});
  //   console.log(banner);
  if (banner.length > 0) {
    res.send(banner);
  } else {
    res.send({ message: "data not found" });
  }
});

//post blogs

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.send(blogs);
  } catch (err) {}
});

module.exports = router;
