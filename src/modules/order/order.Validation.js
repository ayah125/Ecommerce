import joi from "joi";
const createOrderval = joi.object({
  id: joi.string().hex().length(24).required(),
  shippingAdress: joi
    .object({
      street: joi.string().trim().required(),
      city: joi.string().trim().required(),
      phone: joi.string().trim().required(),
    })
    .required(),
});
const paramIdVal = joi.object({
  id: joi.string().hex().length(24).required(),
});

const updateQuantityVal = joi.object({
  //product: joi.string().hex().length(24).required(),

  id: joi.string().hex().length(24),
  quantity: joi.number().integer().options({ convert: false }).required(),
});
export { createOrderval, paramIdVal, updateQuantityVal };
