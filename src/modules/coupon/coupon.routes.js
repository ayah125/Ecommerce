import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";
import {
  addcouponval,
  paramIdVal,
  updatecouponVal,
} from "./coupon.Validation.js";
import {
  addcoupon,
  deletecoupon,
  getallcoupons,
  getsinglecoupon,
  updatecoupon,
} from "./coupon.controller.js";
const couponroute = express.Router();
couponroute.use(protectedRoute, allowTo("admin", "user"));
couponroute
  .route("/")
  .post(validation(addcouponval), addcoupon)
  .get(getallcoupons);

couponroute
  .route("/:id")
  .get(validation(paramIdVal), getsinglecoupon)
  .put(validation(updatecouponVal), updatecoupon)
  .delete(validation(paramIdVal), deletecoupon);
export default couponroute;
