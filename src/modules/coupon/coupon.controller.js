import slugify from "slugify";
import { catcherror } from "../../middleware/catcherror.js";
import { deletOne, getone } from "../handler/handlers.js";
import { Apifeatures } from "../../utils/APIFeatures.js";
import { AppError } from "../../utils/apperror.js";
import { coupounmodel } from "../../../databases/models/copounmodel.js";

const addcoupon = catcherror(async (req, res, next) => {
  req.body.user = req.user._id;
  let iscouponexist = await coupounmodel.findOne({
    code: req.body.code,
  });
  if (iscouponexist) return next(new AppError("coupon already exists!", 401));
  let coupon = new coupounmodel(req.body);
  await coupon.save();
  res.json({ message: "Added!", coupon });
});
const getallcoupons = catcherror(async (req, res, next) => {
  let apifeatuers = new Apifeatures(coupounmodel.find({}), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
  let coupons = await apifeatuers.mongoosequery;
  res.json({
    message: "SUCCESS!",
    coupons,
  });
});
const getsinglecoupon = getone(coupounmodel);
const updatecoupon = catcherror(async (req, res, next) => {
  let coupon = await coupounmodel.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  !coupon && res.status(404).json({ message: "coupon not found" });
  coupon && res.json({ message: "success", coupon });
});
const deletecoupon = deletOne(coupounmodel);

export {
  addcoupon,
  updatecoupon,
  getallcoupons,
  getsinglecoupon,
  deletecoupon,
};
