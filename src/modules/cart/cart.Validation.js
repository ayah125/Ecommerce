import joi from "joi";
const addcartval = joi.object({
  quantity: joi.number().integer().options({ convert: false }),
  price: joi.number().integer().options({ convert: false }),
  product: joi.string().hex().length(24).required(),
});
const paramIdVal = joi.object({
  id: joi.string().hex().length(24).required(),
});

const updateQuantityVal = joi.object({
  //product: joi.string().hex().length(24).required(),

  id: joi.string().hex().length(24),
  quantity: joi.number().integer().options({ convert: false }).required(),
});
export { addcartval, paramIdVal, updateQuantityVal };
