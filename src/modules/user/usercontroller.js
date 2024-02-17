import { usermodel } from "../../../databases/models/usermodel.js";

import { Apifeatures } from "../../utils/APIFeatures.js";

const Adduser = async (req, res, next) => {
  let user = new usermodel(req.body);
  await user.save();
  res.json({ message: "Added!", user: { name: user.name, email: user.email } });
};
const getallusers = async (req, res, next) => {
  //let users = await usermodel.find();
  let apifeatuers = new Apifeatures(usermodel.find(), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
  let users = await apifeatuers.mongoosequery;
  res.json({ message: "All users:", users });
};
const updateuser = async (req, res, next) => {
  let user = await usermodel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !user && res.json({ message: "not updated!" });
  user && res.json({ message: "Updated!", user });
};

export { Adduser, getallusers, updateuser };
