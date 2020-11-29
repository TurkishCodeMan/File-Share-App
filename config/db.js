
const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGO_CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', function () {
        console.log("Database Connected")
    });
}

module.exports=connectDB;