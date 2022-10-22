const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Blog = require("../model/blog");
require("dotenv").config();

router.get("/", async (req, res) => {
  const blog = await Blog.find({});
  //   console.log(banner);
  if (blog.length > 0) {
    res.send(blog);
  } else {
    res.send({ message: "data not found" });
  }
});

//post blogs

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.send({ message: "data inserted" });
  } catch (err) {
    res.json(400).send({ message: "data not inserted" });
  }
});

module.exports = router;
