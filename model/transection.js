const mongoose = require("mongoose");
const transectionSchema = require("../schema/transection");
const Transection = new mongoose.model("transection", transectionSchema);

module.exports = Transection;
