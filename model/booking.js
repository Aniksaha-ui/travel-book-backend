const mongoose = require("mongoose");
const bookingSchema = require("../schema/booking");
const Booking = new mongoose.model("booking", bookingSchema);

module.exports = Booking;
