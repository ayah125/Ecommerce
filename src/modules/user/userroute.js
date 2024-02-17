import express from "express";

import { validation } from "../../middleware/validation.js";
import { adduserval, updateuserval } from "./user.validation.js";
import { Adduser, getallusers, updateuser } from "./userController.js";
import { check } from "../../middleware/checkemail.js";
const userRoute = express.Router();
userRoute
  .route("/")
  .post(validation(adduserval), check, Adduser)
  .get(getallusers);

userRoute
  .route("/:id")
  //.get(validation(paramIdVal), getsinglecategory)
  .put(validation(updateuserval), updateuser);
// .delete(validation(paramIdVal), deleteCategory);
export default userRoute;
