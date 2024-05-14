const { v2 } = require('cloudinary')

const app = require('./app.js')
const connectToDB = require('./config/dbconn.js')

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  // Connect to DB
  await connectToDB();
  console.log(`App is running at http://localhost:${PORT}`);
});
