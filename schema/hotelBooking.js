const mongoose = require("mongoose");
const hotelBookingSchema = mongoose.Schema({
  tourId: {
    type: String,
    required: true,
  },
  tourName: {
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
  },
  hotelName: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  personname: {
    type: String,
    required: true,
  },
});

module.exports = hotelBookingSchema;
