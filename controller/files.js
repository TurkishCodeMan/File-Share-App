const upload = require("../config/multer")
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");
const fs = require("fs");
const fetch = require("node-fetch")
const http = require("http")
const axios = require("axios")
const path = require("path");



const addFile = async (req, res, next) => {

    try {
        //Validate File
        if (typeof req.file == 'undefined') {
            return res.json({ error: "All Fields İs Required" })
        }


        //File Upload
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).send({ error: err.message })
            }
            //Store Database
            const file = new File({
                filename: req.file.filename,
                uuid: uuid4(),
                path: req.file.path,
                size: req.file.size,

            });

            const response = await file.save();
            return res.json({ file: `${process.env.APP_BASE_URL}/api/files/${file.uuid}` });



        });
    } catch (error) {
        res.json({ error: error.message });
    }
}


const downloadFile = async (req, res, next) => {

    const url = `http://localhost:3000/api/files/${req.params.uuid}`

    console.log(req.params.uuid)

    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        console.log(file);
        if (!file) {
            return res.json({ error: "File is Not Found" });
        }


        const filepath = `${__dirname}/../${file.path}`;
        console.log(filepath)
        res.download(filepath);
    } catch (error) {
        res.json({ error: error.message });
    }
}


module.exports = ({
    addFile,
    downloadFile
})