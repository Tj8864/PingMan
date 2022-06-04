const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const WebsiteModel = require("../models/website.model");
const key = "secretKey321";

const handleWebsiteAdd = async (request, response) => {
  try {
    const token = request.headers["x-access-token"];
    const decoded = jwt.verify(token, key);
    const email = decoded.email;

    const user = await User.findOne({ email });
    if (user.websites.includes(request.body.websiteURL)) {
      response.json({
        status: "error",
        error: "User already monitoring this website",
      });
      return;
    }
    user.websites.push(request.body.websiteURL);
    user.websites = user.websites;
    await user.save();

    let existing = await WebsiteModel.findOne({
      websiteURL: request.body.websiteURL,
    });

    if (existing) {
      existing.users.push(email);
      existing.users = existing.users;
      await existing.save();
    } else {
      const website = new WebsiteModel({
        websiteURL: request.body.websiteURL,
        totalDowntime: 0,
        users: [email],
        monitoringStartTime: new Date(),
        lastUpTime: new Date(),
        isUp: true,
        lastCheck: new Date(),
        uptimePercent: 100,
      });
      console.log(website);
      await website.save();
    }
    response.json({ status: "ok" });
  } catch (e) {
    response.json({ status: "error", error: e.message });
  }
};

module.exports =  handleWebsiteAdd;