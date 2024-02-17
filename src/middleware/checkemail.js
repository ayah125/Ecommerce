import { usermodel } from "../../databases/models/usermodel.js";
export const check = async (req, res, next) => {
  let user = await usermodel.findOne({ email: req.body.email });
  if (user) return res.json({ message: "email is already exist" });

  next();
};
