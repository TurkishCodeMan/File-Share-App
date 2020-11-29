const multer=require("multer");
const path=require("path");


let storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads/"),
    filename:(req,file,cb)=>{
        const uniqueName=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName)
    }
})

let upload=multer({
    storage,
    limits:{fileSize:1000000*100},
}).single("myfile");


module.exports=upload;