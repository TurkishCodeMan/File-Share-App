const express = require("express");
const app = express();
require("custom-env").env("stating")
const bodyparser = require("body-parser")
const cors = require("cors");
const fs = require("fs");
const fileRouter = require("./routes/files")

//Middlewares
app.use(bodyparser.json());
app.use(express.static(__dirname + "/public/"));; // for serving the HTML file

app.use(bodyparser.urlencoded({ extended: false }))
app.use(cors({
    origin: ["http://localhost:8080",
        "https://localhost:8080"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
}));


//Routes
app.use("/api", fileRouter);


//Connect MongoDB
const connectDB = require("./config/db");
connectDB();

var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function () {
    console.log('Listening on port %d', server_port);
});
