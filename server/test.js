const mongoose = require("mongoose");
require("dotenv").config();
require('dns').setServers(['8.8.8.8', '1.1.1.1']);
async function testConnection() {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI);
    console.log("Node Version:", process.version);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");
    process.exit(0);
  } catch (error) {
    console.log("❌ MongoDB Connection Failed");
    console.log(error);
    process.exit(1);
  }
}

testConnection();