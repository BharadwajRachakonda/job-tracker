require("dotenv").config();
require("pg");
const app = require("../app");
const { sequelize } = require("../models");

let dbConnected = false;

const connectDatabase = async () => {
  if (!dbConnected) {
    try {
      await sequelize.authenticate();
      console.log("Connected to database.");
      dbConnected = true;
    } catch (error) {
      console.error("Database connection failed:", error);
      throw error;
    }
  }
};

app.get("/", (req, res) => {
  res.send("<h1>Job Tracker Server</h1><p>Server is running successfully!</p>");
});

module.exports = async (req, res) => {
  try {
    await connectDatabase();
    return app(req, res);
  } catch (error) {
    console.error("Request handling error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
