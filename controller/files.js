const upload = require("../config/multer")
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");
const fs = require("fs");
const fetch = require("node-fetch")
const http = require("http")
const axios = require("axios")
const path = require("path");




const addFile = async (req, res, next) => {
    let _file = {};
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
            _file = file;
            const response = await file.save();

            return res.json({ file: `${process.env.APP_BASE_URL}/api/files/${file.uuid}` });



        });

        setTimeout(() => {
            deletefile();
        }, 1800000);

        const deletefile = async () => {
            const file = await File.findOne({ uuid: _file.uuid });
            fs.unlink(`${__dirname}/../${file.path}`, (err) => {
                console.log(err);
            })
        }


    } catch (error) {
        res.json({ error: error.message });
    }
}


const downloadFile = async (req, res, next) => {


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