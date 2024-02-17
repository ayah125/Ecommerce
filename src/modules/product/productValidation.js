import joi from "joi";
const addproductval = joi.object({
  title: joi.string().min(2).max(300).required().trim(),
  description: joi.string().min(10).max(1500).required().trim(),
  price: joi.number().min(0).required(),
  priceAfterDiscount: joi.number().min(0).optional(),
  quantity: joi.number().min(0).optional(),
  category: joi.string().hex().length(24).required(),
  subcategory: joi.string().hex().length(24).required(),
  brand: joi.string().hex().length(24).required(),
  createdBy: joi.string().hex().length(24),
});
const paramIdVal = joi.object({
  id: joi.string().hex().length(24).required(),
});

const updateproductVal = joi.object({
  id: joi.string().hex().length(24).required(),
  title: joi.string().min(2).max(300).trim(),
  description: joi.string().min(10).max(1500).trim(),
  price: joi.number().min(0),
  priceAfterDiscount: joi.number().min(0).optional(),
  quantity: joi.number().min(0).optional(),
  category: joi.string().hex().length(24),
  subcategory: joi.string().hex().length(24),
  brand: joi.string().hex().length(24),
  createdBy: joi.string().hex().length(24),
});

export { addproductval, paramIdVal, updateproductVal };
