import express from "express";
import {
  addCategory,
  deleteCategory,
  getallcategories,
  getsinglecategory,
  updatcategory,
} from "./categoryController.js";
import {
  addCategoryval,
  paramIdVal,
  updatecategoryVal,
} from "./categoryValidation.js";
import { validation } from "../../middleware/validation.js";
import { uploadsinglefile } from "../../../service/file upload/fileupload.js";
import subcategoryroute from "../subcategory/subcategoryroutes.js";
import { protectedRoute } from "../auth/auth.controller.js";
const categoryroute = express.Router();
categoryroute.use("/:category/subcategories", subcategoryroute);
categoryroute
  .route("/")
  .post(
    uploadsinglefile("img"),
    protectedRoute,
    validation(addCategoryval),
    addCategory
  )
  .get(getallcategories);

categoryroute
  .route("/:id")
  .get(validation(paramIdVal), getsinglecategory)
  .put(uploadsinglefile("img"), validation(updatecategoryVal), updatcategory)
  .delete(validation(paramIdVal), deleteCategory);
export default categoryroute;
