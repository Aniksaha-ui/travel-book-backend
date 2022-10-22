const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
  authorName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  blog: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    default:
      "https://static.wixstatic.com/media/239308_cc82566e6c7b40a9948b196b8016a362~mv2_d_1920_1280_s_2.jpg/v1/fill/w_1920,h_1280,al_c/239308_cc82566e6c7b40a9948b196b8016a362~mv2_d_1920_1280_s_2.jpg",
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = blogSchema;
