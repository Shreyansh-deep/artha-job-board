const axios = require("axios");
const xml2js = require("xml2js");
const mongoose = require("mongoose");
require("dotenv").config();

const { importJobs } = require("../services/jobService");
const ImportLog = require("./models/ImportLog");
const connectDB = require("../config/db");

const parseXML = async (url) => {
  const res = await axios.get(url);
  const result = await xml2js.parseStringPromise(res.data);
  return result;
};

const fetchAndImportJobs = async () => {
  await connectDB(); // ensure DB connection
  const urls = [
    "https://jobicy.com/?feed=job_feed&job_categories=data-science",
    "https://www.higheredjobs.com/rss/articleFeed.cfm"
  ];

  for (const url of urls) {
    try {
      const data = await parseXML(url);
      const jobs = data?.rss?.channel?.[0]?.item || [];

      console.log(`📥 Fetched ${jobs.length} jobs from: ${url}`);

      const summary = await importJobs(jobs);

      const log = new ImportLog({
        timestamp: new Date(),
        source: url,
        ...summary,
      });

      await log.save();
      console.log(`✅ Imported and logged summary from: ${url}`);
    } catch (err) {
      console.error(`❌ Failed processing ${url}:`, err.message);
    }
  }

  mongoose.connection.close();
};

if (require.main === module) {
  fetchAndImportJobs();
}

module.exports = fetchAndImportJobs;
