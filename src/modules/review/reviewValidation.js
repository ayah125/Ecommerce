import joi from "joi";
const addreivewval = joi.object({
  text: joi.string().min(1).max(200).required().trim(),
  rate: joi.number().min(0).max(5).required(),
  product: joi.string().hex().length(24).required(),
});
const paramIdVal = joi.object({
  id: joi.string().hex().length(24).required(),
});

const updatereivewVal = joi.object({
  text: joi.string().min(1).max(200).trim(),
  rate: joi.number().min(0).max(5),
  product: joi.string().hex().length(24),
  id: joi.string().hex().length(24),
});
export { addreivewval, paramIdVal, updatereivewVal };
