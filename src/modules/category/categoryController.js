import slugify from "slugify";
import { categorymodel } from "../../../databases/models/categorymodel.js";
import { catcherror } from "../../middleware/catcherror.js";
import { deletOne } from "../handler/handlers.js";
import { Apifeatures } from "../../utils/APIFeatures.js";

const addCategory = async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  let category = new categorymodel(req.body);
  await category.save();
  res.json({ message: "Added!", category });
};
const getallcategories = catcherror(async (req, res, next) => {
  let apifeatuers = new Apifeatures(categorymodel.find(), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
  let categories = await apifeatuers.mongoosequery;
  res.json({ message: "Categories:", categories });
});
const getsinglecategory = catcherror(async (req, res, next) => {
  let category = await categorymodel.findById(req.params.id);
  !category && res.status(404).json({ message: "Category not found" });
  category && res.json({ message: "success", category });
});
const updatcategory = catcherror(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.image = req.file.filename;
  let category = await categorymodel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  !category && res.status(404).json({ message: "Category not found" });
  category && res.json({ message: "success", category });
});
const deleteCategory = deletOne(categorymodel);

export {
  addCategory,
  getallcategories,
  getsinglecategory,
  updatcategory,
  deleteCategory,
};
