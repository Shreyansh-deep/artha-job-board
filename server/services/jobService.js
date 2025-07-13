const Job = require("./models/Job");

const importJobs = async (jobList) => {
  let newJobs = 0;
  let updatedJobs = 0;
  let failedJobs = [];

  for (const job of jobList) {
    try {
      const existing = await Job.findOne({ guid: job.guid[0] });

      if (existing) {
        await Job.updateOne({ guid: job.guid[0] }, { $set: job });
        updatedJobs++;
      } else {
        await Job.create(job);
        newJobs++;
      }
    } catch (error) {
      failedJobs.push({
        jobId: job.guid?.[0] || "unknown",
        reason: error.message,
      });
    }
  }

  return {
    totalFetched: jobList.length,
    totalImported: newJobs + updatedJobs,
    newJobs,
    updatedJobs,
    failedJobs,
  };
};

module.exports = { importJobs };
