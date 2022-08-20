const mongoose = require("mongoose");
const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  availableSeat: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  starting_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  include: [{ type: String }],
  notInclude: [{ type: String }],
});

module.exports = tourSchema;
