const mongoose = require("mongoose");
const followersSchema = require("../schema/followers");
const Followers = new mongoose.model("followers", followersSchema);

module.exports = Followers;
