const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const axios = require("axios").default;

const User = require("../models/user.model");
const WebsiteModel = require("../models/website.model");
const key = "secretKey321";

const handleLogin = async (request, response) => {
  console.log(request.body);
  try {
    const user = await User.findOne({
      email: request.body.email,
      password: request.body.password,
    });
    if (user) {
      let token = jwt.sign({ name: user.name, email: user.email }, key, {
        expiresIn: "1d",
      });
      response.json({ status: "ok", token });
    } else {
      response.json({ status: "user not found" });
    }
  } catch (e) {
    console.log(e)
    response.json({ status: "error", error: e.message });
  }
};

module.exports =  handleLogin;