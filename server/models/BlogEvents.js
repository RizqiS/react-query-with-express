const mongoose = require("mongoose");
const schemaBlogEvents = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const BlogEvents = mongoose.model("Events", schemaBlogEvents);
module.exports = BlogEvents;
