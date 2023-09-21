const mongoose = require("mongoose");
const bookingPersonSchema = require("../schema/booking-person-information");
const BookingPersons = new mongoose.model("booking-persons-information", bookingPersonSchema);

module.exports = BookingPersons;
