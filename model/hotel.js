const mongoose = require("mongoose");
const hotelSchema = require("../schema/hotel");
const Hotel = new mongoose.model("hotel", hotelSchema);

module.exports = Hotel;
