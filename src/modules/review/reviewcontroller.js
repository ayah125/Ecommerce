import slugify from "slugify";
import { catcherror } from "../../middleware/catcherror.js";
import { reviewmodel } from "../../../databases/models/reviewmodel.js";
import { deletOne, getone } from "../handler/handlers.js";
import { Apifeatures } from "../../utils/APIFeatures.js";
import { AppError } from "../../utils/apperror.js";

const addreview = async (req, res, next) => {
  req.body.user = req.user._id;
  let isreviewexist = await reviewmodel.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (isreviewexist) return next(new AppError("you reviewed before", 401));
  let review = new reviewmodel(req.body);
  await review.save();
  res.json({ message: "Added!", review });
};
const getallreviews = catcherror(async (req, res, next) => {
  let apifeatuers = new Apifeatures(reviewmodel.find({}), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
  let reviews = await apifeatuers.mongoosequery;
  res.json({
    message: "SUCCESS!",
    reviews,
  });
});
const getsinglereview = getone(reviewmodel);
const updatreview = catcherror(async (req, res, next) => {
  let review = await reviewmodel.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  !review && res.status(404).json({ message: "review not found" });
  review && res.json({ message: "success", review });
});
const deletereview = deletOne(reviewmodel);

export { addreview, updatreview, getallreviews, getsinglereview, deletereview };
