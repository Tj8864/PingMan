const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const axios = require("axios").default;

const User = require("../models/user.model");
const WebsiteModel = require("../models/website.model");

const handleRegister = async (request, response) => {
  console.log(request.body);
  try {
    const user = await User.create({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    });
    response.json({ status: "ok" });
  } catch (e) {
    response.json({ status: "error", error: e.message });
  }
};

module.exports =  handleRegister