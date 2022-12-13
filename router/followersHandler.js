const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Followers = require("../model/followers");
require("dotenv").config();

//post followers

router.post("/", async (req, res) => {
  try {
    console.log("hitted on followers");
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

// router.get("/sendMail/:email", async (req, res) => {
//   try {
//     console.log("hitted in email");

//     const { email } = req.params;
//     await main(email).catch(console.error);
//   } catch (err) {
//     console.log(err);
//   }
// });

// async function main(email) {
//   var transport = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     auth: {
//       user: "2018-1-60-181@std.ewubd.edu",
//       pass: "vwgtsqlinehvzaml",
//     },
//   });

//   var mailOptions = {
//     from: "2018-1-60-181@std.ewubd.edu",
//     to: `${email}`,
//     subject: "Greeting",
//     text: `Welcome to our travel tour agency...`,
//   };

//   transport.sendMail(mailOptions, function (err, info) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Email send");
//     }
//   });
// }

module.exports = router;
