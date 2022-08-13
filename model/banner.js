const mongoose = require("mongoose");
const bannerSchema = require("../schema/banner");
const Banner = new mongoose.model("banner", bannerSchema);

module.exports = Banner;
