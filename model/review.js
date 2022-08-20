const mongoose = require("mongoose");
const reviewSchema = require("../schema/review");
const Review = mongoose.model("review", reviewSchema);

exports.module = Review;
