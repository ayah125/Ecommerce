import joi from "joi";
const addsubCategoryval = joi.object({
  name: joi.string().min(2).max(200).required().trim(),
  category: joi.string().hex().length(24).required(),
});
const paramIdVal = joi.object({
  id: joi.string().hex().length(24).required(),
});

const updatesubcategoryVal = joi.object({
  name: joi.string().min(2).max(200).trim(),
  category: joi.string().hex().length(24),
});
export { addsubCategoryval, paramIdVal, updatesubcategoryVal };
