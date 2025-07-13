const mongoose = require("mongoose");

const ImportLogSchema = new mongoose.Schema({
  timestamp: Date,
  source: String,
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: [{ jobId: String, reason: String }],
});

module.exports = mongoose.model("ImportLog", ImportLogSchema);
