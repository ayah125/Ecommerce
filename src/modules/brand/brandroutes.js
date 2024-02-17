import { validation } from "../../middleware/validation.js";
import { uploadsinglefile } from "../../../service/file upload/fileupload.js";
import express from "express";
import {
  addbrand,
  deletebrand,
  getallbrands,
  getsinglebrand,
  updatbrand,
} from "./brandcontroller.js";
import { addbrandval, paramIdVal, updatebrandVal } from "./brandValidation.js";
const brandroute = express.Router();
brandroute
  .route("/")
  .post(uploadsinglefile("logo"), validation(addbrandval), addbrand)
  .get(getallbrands);

brandroute
  .route("/:id")
  .get(validation(paramIdVal), getsinglebrand)
  .put(uploadsinglefile("logo"), validation(updatebrandVal), updatbrand)
  .delete(validation(paramIdVal), deletebrand);
export default brandroute;
