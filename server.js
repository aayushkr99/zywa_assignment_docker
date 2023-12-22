const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { CronJob } = require("cron");
const router = require("./src/routes/route")

const { loadCSVData } = require("./src/loadCSVData");

// CRON scheduler
const job = new CronJob("*/2 * * * *", function () {
  loadCSVData();
});
job.start();


app.use("/zywa", router)
app.use("/test" , (req, res) => {
  res.send("Hi there!, test API, Please Ignore")
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
