/*
const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGO_URI 
    );

    if (connection) {
      console.log(`Connected to MongoDB: ${connection.host}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectToDB;
*/
const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI , {
        });
        console.log("Connected to the database!");
    } catch (err) {
        console.log("Cannot connect to the database!", err);
        process.exit();
    }
};

module.exports = connectToDB;
