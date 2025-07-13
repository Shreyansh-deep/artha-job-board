const Job = require("../models/Job");

const importJobs = async (jobList) => {
  let newJobs = 0;
  let updatedJobs = 0;
  let failedJobs = [];

  for (const job of jobList) {
    
    const guidValue =
      typeof job.guid?.[0] === "string"
        ? job.guid[0]
        : job.guid?.[0]?._ || "unknown";

    try {
      const cleanedJob = {
        guid: guidValue,
        title: job.title?.[0] || "",
        link: job.link?.[0] || "",
        description: job.description?.[0] || "",
        pubDate: job.pubDate?.[0] || "",
      };

      const existing = await Job.findOne({ guid: guidValue });

      if (existing) {
        await Job.updateOne({ guid: guidValue }, { $set: cleanedJob });
        updatedJobs++;
      } else {
        await Job.create(cleanedJob);
        newJobs++;
      }
    } catch (error) {
      failedJobs.push({
        jobId: guidValue,
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
