import joi from "joi";
const adduserval = joi.object({
  name: joi.string().min(2).max(200).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  age: joi.number().integer(),
  repassword: joi.valid(joi.ref("password")).required(),
  role: joi.string().valid("user", "admin"),
});

const paramIdVal = joi.object({
  id: joi.string().hex().length(24).required(),
});
const updateuserval = joi.object({
  id: joi.string().hex().length(24),
  name: joi.string().max(200),
  email: joi.string().email(),
  password: joi.string(),
  repassword: joi.valid(joi.ref("password")),
  role: joi.string().valid("user", "admin"),
});
const deleteuserval = joi.object({
  email: joi.string().email().required(),
});
const changepasswordschema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  repassword: joi.valid(joi.ref("password")).required(),
});
export { adduserval, paramIdVal, updateuserval, deleteuserval };
