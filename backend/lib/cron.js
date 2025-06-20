// lib/cron.js
const { CronJob } = require("cron");
const https = require("https");

const job = new CronJob(
  "*/14 * * * *", // Every 14 minutes
  function () {
    console.log("⏰ Running scheduled job...");
    https
      .get(process.env.API_URL, (res) => {
        if (res.statusCode === 200) {
          console.log("✅ GET request sent successfully");
        } else {
          console.log("❌ GET request failed", res.statusCode);
        }
      })
      .on("error", (e) => {
        console.error("🚨 Error while sending request", e);
      });
  },
  null,
  false,
  "UTC"
);

module.exports = job;
