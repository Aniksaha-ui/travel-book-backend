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
    default:
      "https://static.wixstatic.com/media/239308_cc82566e6c7b40a9948b196b8016a362~mv2_d_1920_1280_s_2.jpg/v1/fill/w_1920,h_1280,al_c/239308_cc82566e6c7b40a9948b196b8016a362~mv2_d_1920_1280_s_2.jpg",
  },
  country: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "upcomeing",
  },
  duration: {
    type: String,
    required: true,
  },
  starting_date: {
    type: Date,
    default: Date.now(),
  },
  end_date: {
    type: Date,
    default: Date.now(),
  },
  departure: {
    type: String,
    required: true,
  },

  include: [{ type: String }],
  notInclude: [{ type: String }],
});

module.exports = tourSchema;
