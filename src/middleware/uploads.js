import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import AppError from "../utils/AppError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// upload file to spacfic destination\


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        // gnertat uniqu name for uploaded file or picture
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});


const fileFilter = (req, file, cb) => {

    const allowedFileType = /jpg|jpeg|png|gif/;
    const exename = path.extname(file.originalname).toLowerCase();
    if (allowedFileType.test(exename)) {
        cb(null, true);
    } else {
        cb(new AppError("Only jpg, jpeg, png, gif files are allowed",400));
    }
}

export const upload = multer({
    storage,
    fileFilter
});