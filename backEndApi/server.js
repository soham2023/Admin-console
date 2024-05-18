const app = require('./app');
const connectToDatabase = require('./config/dbconn');

const PORT = process.env.PORT || 3000;

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
