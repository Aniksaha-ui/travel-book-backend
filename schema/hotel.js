const mongoose = require("mongoose");
const hotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  tel: {
    type: String,
  },
  review: {
    type: String,
  },
  facebook: {
    type: String,
  },
});

module.exports = hotelSchema;
