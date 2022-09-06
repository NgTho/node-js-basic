import express from "express";
import {
    getHomepage,
    getDetail,
    createUser,
    deleteUser,
    getUser,
    updateUser
} from "../controller/homeController"
import about from "../controller/about"


/* config upload file */
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");
import {
    getUpload,
    uploadFile,
    uploadMultiFile
} from "../controller/uploadController"
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage, fileFilter: imageFilter });
/* end config upload file */


let router = express.Router();


const initWebRoute = (app) => {
    router.get('/', getHomepage)
    router.get('/about', about)
    router.get('/detail/:userId', getDetail)
    router.post('/create', createUser)
    router.post('/delete', deleteUser)
    router.get('/edit/:id', getUser)
    router.post('/update', updateUser)
    router.get('/upload', getUpload)
    router.post('/upload-pic', upload.single("upload-input"), uploadFile)
    router.post('/upload-multi-pic', upload.array("upload-multi-input", 10), uploadMultiFile)
    return app.use('/', router);
    // return app.use('/abc', router); => default url: localhost:3000/abc
}
export default initWebRoute;