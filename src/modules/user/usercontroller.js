import { usermodel } from "../../../databases/models/usermodel.js";
import { catcherror } from "../../middleware/catcherror.js";
import { Apifeatures } from "../../utils/APIFeatures.js";
// const signup = catcherror(async (req, res, next) => {
//   await usermodel.insertMany(req.body);
//   sendemail(req.body.email);
//   res.json({ message: "success" });
// });
// const signin = async (req, res, next) => {
//   let user = await usermodel.findOne({ email: req.body.email });
//   if (
//     user
//     // bcrypt.compareSync(req.body.password, user.password)
//   ) {
//     let token = jwt.sign({ email: user.email }, "ayah");
//     return res.json({ message: "signin", token });
//   }
//   next(new AppError("incorrect pass or email", 401));
// };

// const verify = (req, res) => {
//   jwt.verify(req.params.token, process.env.jwt_key, async (err, decode) => {
//     if (err) return res.json(err);

//     await usermodel.findOneAndUpdate(
//       { email: decode.email },
//       { verifyemail: true }
//     );
//     res.json({ message: "success" });
//   });
// };
// const changepassword = async (req, res, next) => {
//   let users = await usermodel.findOne({ email: req.body.email });
//   if (users) {
//     await usermodel.findOneAndUpdate(
//       { email: req.body.email },
//       { password: req.body.password, repassword: req.body.repassword }
//     );
//     res.json({ message: "success" });
//   } else {
//     next(new AppError("email not found", 401));
//   }
// };
//const updateuser = async (req, res, next) => {
// let users = await usermodel.findOne({ email: req.body.email });
// if (users) {
//   await usermodel.findOneAndUpdate({ email: req.body.email }, req.body);
//   res.json({ message: "Updated" });
// } else {
//   next(new AppError("email not found", 401));
// }
//};
// const deleteuser = async (req, res, next) => {
//   let users = await usermodel.findOne({ email: req.body.email });
//   if (users) {
//     await usermodel.findOneAndDelete({ email: req.body.email });
//     res.json({ message: "Deleted" });
//   } else {
//     next(new AppError("email not found", 401));
//   }
// };
const Adduser = catcherror(async (req, res, next) => {
  let user = new usermodel(req.body);
  await user.save();
  res.json({ message: "Added!", user: { name: user.name, email: user.email } });
});
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

export {
  // verify,
  // signin,
  // changepassword,
  // updateuser,
  // deleteuser,
  Adduser,
  getallusers,
  updateuser,
};
