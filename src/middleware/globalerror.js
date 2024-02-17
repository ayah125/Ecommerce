export const globalerror = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  if (process.env.mode == "prod") {
    res.status(err.statuscode).json({ error: err });
  } else {
    res.status(err.statuscode).json({ error: err, stack: err.stack });
  }
};
