const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
async function connection() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Database Connected..`);
    } catch (err) {
        console.log(`Failed to connect the database...`);
    }
}

connection();

module.exports = connection;
