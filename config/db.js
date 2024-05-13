const mongoose = require("mongoose")

const connectToDb = async () => {
    mongoose.connect(process.env.MONGO_URL)
    .then((conn)=> {
        console.log(`connected to DB : ${conn.connect.host}`);
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1)
    })
}

module.exports = connectToDb