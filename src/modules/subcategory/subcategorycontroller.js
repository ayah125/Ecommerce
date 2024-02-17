import slugify from "slugify";
import { catcherror } from "../../middleware/catcherror.js";
import { subcategorymodel } from "../../../databases/models/subcategorymodel.js";
import { deletOne, getone } from "../handler/handlers.js";
import { Apifeatures } from "../../utils/APIFeatures.js";

const addsubCategory = async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let subcategory = new subcategorymodel(req.body);
  await subcategory.save();
  res.json({ message: "Added!", subcategory });
};
const getallsubcategories = catcherror(async (req, res, next) => {
  let filterobj = {};
  if (req.params.category) {
    filterobj.category = req.params.category;
  }
  let apifeatuers = new Apifeatures(subcategories.find(filterobj), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
  let subcategories = await apifeatuers.mongoosequery.populate("category");
  res.json({
    message: "SUCCESS!",
    page: apifeatuers.pageNumber,
    subcategories,
  });
});
const getsinglesubcategory = getone(subcategorymodel);
const updatsubcategory = catcherror(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  let subcategory = await subcategorymodel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  !category && res.status(404).json({ message: "Category not found" });
  category && res.json({ message: "success", subcategory });
});
const deletesubCategory = deletOne(subcategorymodel);

export {
  addsubCategory,
  updatsubcategory,
  getallsubcategories,
  getsinglesubcategory,
  deletesubCategory,
};
