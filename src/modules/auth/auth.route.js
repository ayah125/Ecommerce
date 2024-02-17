import express from "express";
import {
  allowTo,
  changePassword,
  protectedRoute,
  signin,
  signup,
} from "./auth.controller.js";
import { check } from "../../middleware/checkemail.js";
import { validation } from "../../middleware/validation.js";
import { changepassval, signinval, signupval } from "./auth.validation.js";

const authRouter = express.Router();

authRouter.post("/signup", validation(signupval), check, signup);
authRouter.post(
  "/signin",
  protectedRoute,
  allowTo("admin", "user"),
  validation(signinval),
  signin
);
authRouter.patch(
  "/changepassword",
  protectedRoute,
  validation(changepassval),
  changePassword
);
export default authRouter;
