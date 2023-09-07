const mongoose = require("mongoose");
const hotelRoomSchema = mongoose.Schema({
  hotel_id : {
    type: String,
  },
  tour_id:{
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  roomId:{
    type: String
  },
  capacity:{
    type: String
  },
  seat_no:{
    type: String
  }
});

module.exports = hotelRoomSchema;
