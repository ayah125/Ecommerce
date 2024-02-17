export const validation = (schema) => {
  return (req, res, next) => {
    let filter = {};
    if (req.file) {
      filter = { image: req.file, ...req.body, ...req.params, ...req.query };
    } else {
      filter = { ...req.body, ...req.params, ...req.query };
    }
    const { error } = schema.validate(filter, { abortEarly: false });
    if (!error) {
      next();
    } else {
      let errmsg = [];
      error.details.forEach((val) => {
        errmsg.push(val.message);
      });
      next(new Error(errmsg, 401));
    }
  };
};
