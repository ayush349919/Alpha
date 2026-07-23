const mongoose = require("mongoose");

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("You successfully connected to MongoDB!");
  } catch (err) {
    console.log(err.message);
  }
}

async function disconnectFromMongoDB() {
  await mongoose.disconnect();
}

module.exports = { connectToMongoDB, disconnectFromMongoDB };