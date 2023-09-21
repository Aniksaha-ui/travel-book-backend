const mongoose = require("mongoose");
const bookingPersonsInformationSchema = mongoose.Schema({
 
  booking_id:{
    type: String
  },

  persons:[
    {name:String,email:String,age:String,address:String,phone:String}
  ]
});

module.exports = bookingPersonsInformationSchema;
