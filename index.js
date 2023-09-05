const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 4000;
const bannerHandler = require("./router/bannerHandler");
const tourHandler = require("./router/tourHandler");
const userHandler = require("./router/userHandler");
const bookingHandler = require("./router/bookingHandler");
const blogHandler = require("./router/blogHandler");
const transectionHandler = require("./router/transectionHandler");
const followersHandler = require("./router/followersHandler");
const hotelHandler = require("./router/hotelHandler");
const User = require("./model/user");
const hotelSchema = require("./schema/hotel");

// const subscribeHandler = require("./router/subscribeHandler");

app.use(cors());
app.use(express.json());

//database connection
mongoose
  .connect(
    "mongodb+srv://admin:sahaanik@cluster0.h7h4wrs.mongodb.net/?retryWrites=true&w=majority",
    {}
  )
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log(err));
// mongoose
//   .connect("mongodb://localhost:27017/travel-agency", {})
//   .then(() => console.log("connected successfully"))
//   .catch((err) => console.log(err));

//database connection end

//test api
app.get("/", (req, res) => {
  res.send({ message: "App running successfully" });
});

app.use("/banner", bannerHandler);
app.use("/tour", tourHandler);
app.use("/booking", bookingHandler);
app.use("/user", userHandler);
app.use("/blog", blogHandler);
app.use("/transection", transectionHandler);
app.use("/followers", followersHandler);
app.use("/hotels", hotelHandler);
// app.use("/hotels", hotelHandler);

app.get("/admin/:email", async (req, res) => {
  console.log("hitted in admin route");
  const email = req.params.email;
  const user = await User.findOne({ email: email });
  const isAdmin = user.role === "admin";
  // console.log(email);
  res.send({ admin: isAdmin });
});
app.listen(port, (a) => {
  console.log(`app listening at port ${port}`);
});
