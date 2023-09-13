const mongoose = require("mongoose");
const hotelRoomBookingSchema = require("../schema/hotelRoomBookingSchema");
const HotelRoomsBooking = new mongoose.model("hotel-rooms-booking", hotelRoomBookingSchema);

module.exports = HotelRoomsBooking;