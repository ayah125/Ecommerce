import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";

import { addAddressval, paramIdVal } from "./address.Validation.js";
import {
  addaddress,
  getLoggetUseraddress,
  removeaddress,
} from "./address.controller.js";
const addressRouter = express.Router();

addressRouter
  .route("/")
  .post(
    protectedRoute,
    allowTo("user", "admin"),
    validation(addAddressval),
    addaddress
  )
  .get(protectedRoute, allowTo("user", "admin"), getLoggetUseraddress);
//   .get(protectedRoute, allowTo("user", "admin"), getLoggetUserwishlist);
addressRouter
  .route("/:id")
  .delete(
    protectedRoute,
    allowTo("admin", "user"),
    validation(paramIdVal),
    removeaddress
  );

export default addressRouter;
