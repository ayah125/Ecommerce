import express from "express";
import {
  addproduct,
  deleteproduct,
  getallproducts,
  getsingleproduct,
  updatproduct,
} from "./productcontroller.js";
import {
  addproductval,
  paramIdVal,
  updateproductVal,
} from "./productValidation.js";

import { uploadfileds } from "../../../service/file upload/fileupload.js";
import { validation } from "../../middleware/validation.js";
const productroute = express.Router();
productroute
  .route("/")
  .post(
    uploadfileds([
      { name: "imgcover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(addproductval),
    addproduct
  )
  .get(getallproducts);

productroute
  .route("/:id")
  .get(validation(paramIdVal), getsingleproduct)
  .put(
    uploadfileds([
      { name: "imgcover", maxcount: 1 },
      { name: "images", maxcount: 10 },
    ]),
    validation(updateproductVal),
    updatproduct
  )
  .delete(validation(paramIdVal), deleteproduct);
export default productroute;
