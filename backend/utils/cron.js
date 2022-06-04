const WebsiteModel = require("../models/website.model");
const axios = require("axios").default;
axios.defaults.timeout = 5000;

const CronJob = async () => {
  setInterval(async () => {
    const websites = await WebsiteModel.find();
    websites.forEach(async (website) => {
      let currentTime = new Date();
      try {
        const response = await axios.get(website.websiteURL);
        console.log(response.status);
        if (response.status === 200) {
          if (!website.isUp) {
            website.totalDowntime += currentTime - website.lastCheck;
            website.uptimePercent =
              100 -
              (website.totalDowntime /
                (currentTime - website.monitoringStartTime)) *
                100;
          }
          website.isUp = true;
          website.lastUpTime = currentTime;
        } else {
          if (website.isUp) {
            website.isUp = false;
            website.lastUpTime = website.lastCheck;
            website.lastCheck = new Date();
          } else {
            website.totalDowntime += new Date() - website.lastCheck;
            website.uptimePercent =
              100 -
              (website.totalDowntime /
                (currentTime - website.monitoringStartTime)) *
                100;
            website.lastCheck = new Date();
          }
        }
        console.log(website.websiteURL, response.status);
        await website.save();
      } catch (e) {
        if (website.isUp) {
          website.isUp = false;
          website.lastUpTime = new Date();
          website.lastCheck = new Date();
        } else {
          website.totalDowntime += new Date() - website.lastCheck;
          website.uptimePercent =
            100 -
            (website.totalDowntime /
              (currentTime - website.monitoringStartTime)) *
              100;
          website.lastCheck = new Date();
        }
        console.log(website.websiteURL, "error: ", e.message);
        await website.save();
      }
      console.log(website.uptimePercent);
    });
    console.log("Cycle ended");
  }, 30000);
};

module.exports = CronJob;