const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  guid: { type: String, required: true, unique: true },
  title: String,
  link: String,
  description: String,
  pubDate: String,
});

module.exports = mongoose.model("Job", jobSchema);
