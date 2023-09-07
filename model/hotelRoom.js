const mongoose = require("mongoose");
const hotelRoomSchema = require("../schema/hotelRoom");
const HotelRooms = new mongoose.model("hotelrooms", hotelRoomSchema);

module.exports = HotelRooms;
