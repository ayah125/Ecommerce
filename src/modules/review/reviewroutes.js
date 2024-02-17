import express from "express";
import { validation } from "../../middleware/validation.js";
import {
  addreivewval,
  paramIdVal,
  updatereivewVal,
} from "./reviewValidation.js";
import {
  addreview,
  deletereview,
  getallreviews,
  getsinglereview,
  updatreview,
} from "./reviewcontroller.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";
const reviewroute = express.Router();

reviewroute
  .route("/")
  .post(
    protectedRoute,
    allowTo("admin", "user"),
    validation(addreivewval),
    addreview
  )
  .get(getallreviews);

reviewroute
  .route("/:id")
  .get(validation(paramIdVal), getsinglereview)
  .put(
    protectedRoute,
    allowTo("user"),
    validation(updatereivewVal),
    updatreview
  )
  .delete(
    protectedRoute,
    allowTo("admin", "user"),
    validation(paramIdVal),
    deletereview
  );
export default reviewroute;
