import joi from "joi";
const addcouponval = joi.object({
  code: joi.string().min(1).max(200).required().trim(),
  expires: joi.date().required(),
  discount: joi.number().min(0).required(),
  product: joi.string().hex().length(24).required(),
});
const paramIdVal = joi.object({
  id: joi.string().hex().length(24).required(),
});

const updatecouponVal = joi.object({
  id: joi.string().hex().length(24).required(),
  code: joi.string().min(1).max(200).trim(),
  expires: joi.date(),
  discount: joi.number().min(0),
  product: joi.string().hex().length(24),
});
export { addcouponval, paramIdVal, updatecouponVal };
