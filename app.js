const express = require("express");
const app = express();
require("custom-env").env("stating")
const bodyparser = require("body-parser")
const cors = require("cors");
const path = require("path");
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

app.listen(process.env.PORT_NAME, (err) => {
    if (err)
        console.log(err);
    console.log(`Listening on port ${process.env.PORT_NAME}`)
})
