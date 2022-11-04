const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
  tourId: {
    type: String,
  },
  tourName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  numberOfPerson: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  completed: {
    type: String,
    default: "no",
  },
});

module.exports = bookingSchema;
