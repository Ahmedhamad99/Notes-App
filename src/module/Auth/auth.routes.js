import express from "express";

import { register } from './controller/register.controller.js';
import { login } from "./controller/login.controller.js";
import {resetPassword} from "./controller/resetPassword.controller.js";
import { forgotPassword } from "./controller/forgetPassword.controller.js";
const router = express.Router();


router.post("/register",register)
router.post("/login",login);
router.post("/resetPassword",resetPassword);
router.post("/forgotPassword",forgotPassword);

export default router;
