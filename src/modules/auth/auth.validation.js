import joi from "joi";
const signupval = joi.object({
  name: joi.string().min(2).max(200).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  age: joi.number().integer(),
  repassword: joi.valid(joi.ref("password")).required(),
  role: joi.string().trim(),
});
const signinval = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
const changepassval = joi.object({
  id: joi.string().hex().length(24),
  password: joi.string().required(),
  newpassword: joi.string().required(),
});
export { signinval, signupval, changepassval };
