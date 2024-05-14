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
