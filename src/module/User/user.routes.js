import express from "express"; 
import {uploadProfilePicture} from "./constroller/uploadpic.controller.js"
import {upload} from "../../middleware/uploads.js"
import logout from "./constroller/logout.controller.js";


const router = express.Router();



router.post("/logout",logout);
router.patch("/upload-profile-pec",upload.single("profilePic"),uploadProfilePicture);

export default router;