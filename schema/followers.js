const mongoose = require("mongoose");
const followerSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = followerSchema;
