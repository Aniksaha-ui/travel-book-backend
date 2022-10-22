const mongoose = require("mongoose");
const blogSchema = require("../schema/blog");
const Blog = new mongoose.model("blog", blogSchema);

module.exports = Blog;
