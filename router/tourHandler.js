const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Tour = require("../model/tour");
const User = require("../model/user");
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
  // console.log(requester, "decoded");
  const requesterAccount = await User.findOne({ email: requester });
  if (requesterAccount.role === "admin") {
    next();
  } else {
    res.send({ message: "admin forbidden", status: 403 });
  }
};

//upcomeing tour
router.get("/upcomeing", async (req, res) => {
  // console.log(Tour);
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
  console.log(typeof id, "from tour description");
  // console.log(id, "from description");
  const tourDescription = await Tour.find({ _id: id });
  res.send(tourDescription);
});

router.post("/add-tour", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    // console.log("hitted");
    const authHeader = req.headers.authorization;
    req.body.include = [req.body.include];
    req.body.notInclude = [req.body.notInclude];
    // console.log(req.body);

    const data = await Tour.create(req.body);
    res.send({ data: data, status: 200 });
  } catch (err) {
    // console.log(err);
  }
});

// router.route("/add-tour").post(verifyJWT, async () => {
//   try {
//     console.log("hitted");
//     req.body.include = [req.body.include];
//     req.body.notInclude = [req.body.notInclude];
//     console.log(req.body);

//     const data = await Tour.create(req.body);
//     res.send(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
