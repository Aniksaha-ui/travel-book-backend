const mongoose = require("mongoose");
const hotelRoomBookingSchema = mongoose.Schema({
  hotelName : {
    type: String,
  },
  tour_id:{
    type: String,
  },
  booking_id:{
    type: String
  },
  room_id: {
    type:String
  },
  persons:[
    {name:String,seat_no:String}
  ]
});

module.exports = hotelRoomBookingSchema;
