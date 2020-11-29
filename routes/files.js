const router =require("express").Router();
const fileController=require("../controller/files")
const upload = require("../config/multer")

router.post("/files",upload,fileController.addFile) //Burda Çalıştı Multer !!!!!
router.get("/files/:uuid",fileController.downloadFile)

module.exports=router;