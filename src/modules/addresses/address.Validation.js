import joi from "joi";
const addAddressval = joi.object({
  city: joi.string().required().trim(),

  street: joi.string().required().trim(),
  phone: joi.string().required().trim(),
});
const paramIdVal = joi.object({
  id: joi.string().hex().length(24).required(),
});

const updateAddressVal = joi.object({
  id: joi.string().hex().length(24),
  city: joi.string().trim(),
  street: joi.string().trim(),
  phone: joi.string().trim(),
});
export { addAddressval, paramIdVal, updateAddressVal };
