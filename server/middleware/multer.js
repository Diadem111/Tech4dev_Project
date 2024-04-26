const util = require("util");
const multer = require("multer");
const DIR = "../uploads/";


let storage = multer.diskStorage({
    destination : ( req,file,cb) => {
        cb(null, "uploads/");
    },
    filename: function (req, file ,cb) {
        // console.log(file.originalname);
        const uniqueSuffix = Date.now() 
        cb(null,   Date.now() +file.originalname) ;
    },
});
//   specify the file type

const fileFilter = (req, file, cb) => {
    // filter images, any image with actual image will throw error 

    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/jfif") {
        cb(null, true);
        // accept only if its png, jpg, jpeg, jfif
    } else {
        cb(new Error("only .png, .jpg, .jpeg file are allowed"), false);
        // reject if its not 

    }

}
// upload the file 
const upload = multer({

    storage: storage,
    fileFilter: fileFilter
});



// let uploadFileMiddleware = util.promisify(uploadFile)
module.exports = upload;