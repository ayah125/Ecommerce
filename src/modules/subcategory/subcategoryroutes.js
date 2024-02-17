import express from "express";
import { validation } from "../../middleware/validation.js";
import {
  addsubCategoryval,
  paramIdVal,
  updatesubcategoryVal,
} from "./subcategoryValidation.js";
import {
  addsubCategory,
  deletesubCategory,
  getallsubcategories,
  getsinglesubcategory,
  updatsubcategory,
} from "./subcategorycontroller.js";
const subcategoryroute = express.Router({ mergeParams: true });
subcategoryroute
  .route("/")
  .post(validation(addsubCategoryval), addsubCategory)
  .get(getallsubcategories);

subcategoryroute
  .route("/:id")
  .get(validation(paramIdVal), getsinglesubcategory)
  .put(validation(updatesubcategoryVal), updatsubcategory)
  .delete(validation(paramIdVal), deletesubCategory);
export default subcategoryroute;
