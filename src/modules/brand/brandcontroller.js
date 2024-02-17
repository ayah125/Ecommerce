import slugify from "slugify";
import { catcherror } from "../../middleware/catcherror.js";
import { brandmodel } from "../../../databases/models/brandmodel.js";
import { deletOne } from "../handler/handlers.js";
import { Apifeatures } from "../../utils/APIFeatures.js";
const addbrand = async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  let brand = new brandmodel(req.body);
  await brand.save();
  res.json({ message: "Added!", brand });
};
const getallbrands = catcherror(async (req, res, next) => {
  let apifeatuers = new Apifeatures(brandmodel.find(), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
  let brands = await apifeatuers.mongoosequery;
  res.json({ message: "brands:", brands });
});
const getsinglebrand = catcherror(async (req, res, next) => {
  let brand = await brandmodel.findById(req.params.id);
  !brand && res.status(404).json({ message: "brand not found" });
  brand && res.json({ message: "success", brand });
});
const updatbrand = catcherror(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.logo = req.file.filename;
  let brand = await brandmodel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !brand && res.status(404).json({ message: "brand not found" });
  brand && res.json({ message: "success", brand });
});
const deletebrand = deletOne(brandmodel);
export { addbrand, getallbrands, getsinglebrand, updatbrand, deletebrand };
