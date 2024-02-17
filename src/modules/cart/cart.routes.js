import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";
import {
  addcart,
  clearUsercart,
  getLoggetUsercart,
  removeitemfromcart,
  updatequantity,
} from "./cart.controller.js";
import {
  addcartval,
  paramIdVal,
  updateQuantityVal,
} from "./cart.Validation.js";
const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(
    protectedRoute,
    allowTo("user", "admin"),
    validation(addcartval),
    addcart
  )
  .delete(protectedRoute, allowTo("user", "admin"), clearUsercart)
  .get(protectedRoute, allowTo("user", "admin"), getLoggetUsercart);
cartRouter
  .route("/:id")
  .delete(
    protectedRoute,
    allowTo("admin", "user"),
    validation(paramIdVal),
    removeitemfromcart
  )
  .put(
    protectedRoute,
    allowTo("user", "admin"),
    validation(updateQuantityVal),
    updatequantity
  );

export default cartRouter;
