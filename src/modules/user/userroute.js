import express from "express";

import { validation } from "../../middleware/validation.js";
import { adduserval, updateuserval } from "./user.validation.js";
import { check } from "../../middleware/checkemail.js";
import { Adduser, getallusers, updateuser } from "./usercontroller.js";
const userRoute = express.Router();
userRoute
  .route("/")
  .post(validation(adduserval), check, Adduser)
  .get(getallusers);

userRoute.route("/:id").put(validation(updateuserval), updateuser);

export default userRoute;
