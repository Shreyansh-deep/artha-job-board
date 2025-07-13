const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: String,
  link: String,
  guid: { type: String, unique: true },
  pubDate: Date,
  description: String,
});

module.exports = mongoose.model("Job", JobSchema);
