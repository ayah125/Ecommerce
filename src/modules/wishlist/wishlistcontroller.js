import { catcherror } from "../../middleware/catcherror.js";
import { usermodel } from "../../../databases/models/usermodel.js";

const addWishList = catcherror(async (req, res, next) => {
  let wishlist = await usermodel
    .findByIdAndUpdate(
      req.user.id,
      { $addToSet: { wishlist: req.body.product } },
      { new: true }
    )
    .populate("wishlist");
  !wishlist && res.status(404).json({ message: "wishlist not found" });
  wishlist && res.json({ message: "success", wishlist });
});
const removewishlist = catcherror(async (req, res, next) => {
  let wishlist = await usermodel
    .findByIdAndUpdate(
      req.user.id,
      { $pull: { wishlist: req.params.id } },
      { new: true }
    )
    .populate("wishlist");
  !wishlist && res.status(404).json({ message: "wishlist not found" });
  wishlist && res.json({ message: "success", wishlist });
});
const getLoggetUserwishlist = catcherror(async (req, res, next) => {
  let wishlist = await usermodel.findById(req.user.id).populate("wishlist");
  !wishlist && res.status(404).json({ message: "wishlist not found" });
  wishlist && res.json({ message: "success", wishlist: wishlist.wishlist });
});
export { addWishList, removewishlist, getLoggetUserwishlist };
