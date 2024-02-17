import joi from "joi";
const addbrandval = joi.object({
  name: joi.string().min(2).max(200).required().trim(),
  image: joi
    .object({
      fieldname: joi.string().required(),
      originalname: joi.string().required(),
      encoding: joi.string().required(),
      size: joi.number().max(5242880).required(),
      mimetype: joi
        .string()
        .valid("image/jpeg", "image/png", "image.jpg")
        .required(),
      destination: joi.string().required(),
      filename: joi.string().required(),
      path: joi.string().required(),
    })
    .required(),
});
const paramIdVal = joi.object({
  id: joi.string().hex().length(24).required(),
});

const updatebrandVal = joi.object({
  name: joi.string().min(2).max(200).trim(),
  id: joi.string().hex().length(24).required(),
  image: joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    size: joi.number().max(5242880).required(),
    mimetype: joi
      .string()
      .valid("image/jpeg", "image/png", "image.jpg")
      .required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required(),
  }),
});
export { addbrandval, paramIdVal, updatebrandVal };
