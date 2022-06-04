const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const axios = require("axios").default;

const User = require("../models/user.model");
const WebsiteModel = require("../models/website.model");
const key = "secretKey321";

const handleWebsiteListQuery = async (request, response) => {
  try {
    const token = request.headers["x-access-token"];
    const decoded = jwt.verify(token, key);
    const email = decoded.email;
    const user = await User.findOne({ email });
    if (user) {
      const Websites = await WebsiteModel.find({
        websiteURL: { $in: user.websites },
      });
      let websites = [];
      Websites.forEach((website) => {
        websites.push({
          websiteURL: website.websiteURL,
          totalDowntime: website.totalDowntime,
          users: website.users,
          monitoringStartTime: website.monitoringStartTime.toLocaleString(),
          lastUpTime: website.lastUpTime.toLocaleString(),
          isUp: website.isUp,
          lastCheck: website.lastCheck.toLocaleString(),
          uptimePercent: website.uptimePercent,
          id: website._id.toString(),
        });
      });
      response.json({ status: "ok", websites });
    } else response.json({ status: "error", error: "invalid token" });
  } catch (e) {
    response.json({ status: "error", error: e.message });
  }
};

const handleWebsiteQuery = async (request, response) => {
  console.log(request.query);
  try {
    const website = await WebsiteModel.findById(
      new mongoose.Types.ObjectId(request.query.id)
    );
    if (website) {
      response.json({
        status: "ok",
        website: {
          websiteURL: website.websiteURL,
          totalDowntime: website.totalDowntime,
          users: website.users,
          monitoringStartTime: website.monitoringStartTime.toLocaleString(),
          lastUpTime: website.lastUpTime.toLocaleString(),
          isUp: website.isUp,
          lastCheck: website.lastCheck.toLocaleString(),
          uptimePercent: website.uptimePercent,
          id: website._id.toString(),
        },
      });
    } else {
      response.json({ status: "error", error: "invalid id" });
    }
  } catch (e) {
    response.json({ status: "error", error: e.message });
  }
};

module.exports =  { handleWebsiteListQuery, handleWebsiteQuery };