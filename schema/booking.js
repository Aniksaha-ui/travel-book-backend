const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
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
    type: String,
    required: true,
  },
});

module.exports = bookingSchema;
