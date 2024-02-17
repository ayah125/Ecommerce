import slugify from "slugify";

import { catcherror } from "../middleware/catcherror.js";
import { productmodel } from "../../databases/models/productmodel.js";
import { deletOne } from "../modules/handler/handlers.js";
import { json } from "express";
import { Apifeatures } from "../utils/APIFeatures.js";
const addproduct = async (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);
  if (req.files.imgcover) req.body.imgcover = req.files.imgcover[0].filename;
  if (req.files.images)
    req.body.images = req.files.images.map((img) => img.filename);
  let product = new productmodel(req.body);
  await product.save();
  res.json({ message: "Added!", product });
};
const getallproducts = catcherror(async (req, res, next) => {
  let apifeatuers = new Apifeatures(productmodel.find(), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
  let products = await apifeatuers.mongoosequery;
  res.json({ message: "products:", products });
});
const getsingleproduct = catcherror(async (req, res, next) => {
  let product = await productmodel.findById(req.params.id);
  !product && res.status(404).json({ message: "product not found" });
  product && res.json({ message: "success", product });
});
const updatproduct = catcherror(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.title);
  if (req.file) req.body.imgcover = req.file.filename;
  let product = await productmodel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !product && res.status(404).json({ message: "product not found" });
  product && res.json({ message: "success", product });
});
const deleteproduct = deletOne(productmodel);

export {
  addproduct,
  getallproducts,
  getsingleproduct,
  updatproduct,
  deleteproduct,
};
