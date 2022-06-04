const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const CronJob = require('./utils/cron')

const handleLogin = require('./utils/handleLogin');
const handleRegister = require('./utils/handleRegister');
const handleWebsiteAdd = require('./utils/handleWebsiteAdd');
const { handleWebsiteListQuery, handleWebsiteQuery } = require("./utils/handleWebsiteQueries");

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect("mongodb://tj:mongopassword@localhost:27017/examPortal");

app.use(cors());
app.use(express.json());

app.post("/api/register", handleRegister);
app.post("/api/login", handleLogin);
app.post("/api/add_website", handleWebsiteAdd);

app.get("/api/get_websites", handleWebsiteListQuery);
app.get("/api/websiteinfo", handleWebsiteQuery);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

CronJob();
