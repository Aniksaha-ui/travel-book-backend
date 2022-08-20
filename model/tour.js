const mongoose = require("mongoose");
const tourSchema = require("../schema/tour");
const Tour = new mongoose.model("tour", tourSchema);

module.exports = Tour;
