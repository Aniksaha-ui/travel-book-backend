const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 4000;
const bannerHandler = require("./router/bannerHandler");
const tourHandler = require("./router/tourHandler");
const bookingHandler = require("./router/bookingHandler");
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

//database connection end

//test api
app.get("/", (req, res) => {
  res.send({ message: "App running successfully" });
});

app.use("/banner", bannerHandler);
app.use("/tour", tourHandler);
app.use("/booking", bookingHandler);

app.listen(port, (a) => {
  // console.log(a);
  console.log(`app listening at port ${port}`);
});
