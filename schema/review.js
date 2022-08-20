const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
  tourName: {
    type: String,
    required: true,
  },
  rateing: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  interval: {
    type: Number,
    required: true,
  },
});

module.exports = reviewSchema;
