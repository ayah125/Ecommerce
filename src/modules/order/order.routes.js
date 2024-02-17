import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";
import {
  createCheckOutSession,
  createcashorder,
  getallorders,
  getspecificorder,
} from "./order.controller.js";
import { createOrderval } from "./order.Validation.js";
const orderRouter = express.Router();

orderRouter
  .route("/:id")
  .post(
    protectedRoute,
    allowTo("user", "admin"),
    validation(createOrderval),
    createcashorder
  );
orderRouter
  .route("/")
  .get(protectedRoute, allowTo("user", "admin"), getspecificorder);
orderRouter.get("/allorders", protectedRoute, allowTo("admin"), getallorders);
orderRouter.post(
  "/checkout/:id",
  protectedRoute,
  allowTo("user"),
  createCheckOutSession
);
//   .delete(protectedRoute, allowTo("user", "admin"), clearUsercart)
//   .get(protectedRoute, allowTo("user", "admin"), getLoggetUsercart);
// orderRouter
//   .route("/:id")
//   .delete(
//     protectedRoute,
//     allowTo("admin", "user"),
//     validation(paramIdVal),
//     removeitemfromcart
//   )
//   .put(
//     protectedRoute,
//     allowTo("user", "admin"),
//     validation(updateQuantityVal),
//     updatequantity
//   );

export default orderRouter;
