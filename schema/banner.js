const mongoose = require("mongoose");
const bannerSchema = mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = bannerSchema;
