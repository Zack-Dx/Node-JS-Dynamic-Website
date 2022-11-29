const mongoose = require("mongoose");

async function connection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/zacknode");
    console.log(`Database Connected..`);
  } catch (err) {
    console.log(`Failed to connect the database...`);
  }
}

connection()

module.exports = connection
