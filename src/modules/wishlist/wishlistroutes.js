import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";
import { addwhishlistval, paramIdVal } from "./wishlistValidation.js";
import {
  addWishList,
  getLoggetUserwishlist,
  removewishlist,
} from "./wishlistcontroller.js";
const whishlistRouter = express.Router();

whishlistRouter
  .route("/")
  .post(
    protectedRoute,
    allowTo("user", "admin"),
    validation(addwhishlistval),
    addWishList
  )
  .get(protectedRoute, allowTo("user", "admin"), getLoggetUserwishlist);
whishlistRouter
  .route("/:id")
  .delete(
    protectedRoute,
    allowTo("admin", "user"),
    validation(paramIdVal),
    removewishlist
  );

export default whishlistRouter;
