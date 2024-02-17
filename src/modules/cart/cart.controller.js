import { cartmodel } from "../../../databases/models/cartmodel.js";
import { productmodel } from "../../../databases/models/productmodel.js";
import { catcherror } from "../../middleware/catcherror.js";
import { AppError } from "../../utils/apperror.js";
const calctotalprice = (cart) => {
  let totalPrice = 0;
  cart.cartItem.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalprice = totalPrice;
  if (cart.discount) {
    let totalPriceAfterDiscount =
      cart.totalprice - (cart.totalprice * cart.discount) / 100;
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  }
};

const addcart = catcherror(async (req, res, next) => {
  let product = await productmodel.findById(req.body.product);
  if (!product) return next(new AppError("product not found !", 404));
  if (req.body.quantity >= product.quantity)
    return next(new AppError("sold out!", 404));
  req.body.price = product.price;
  let iscartexist = await cartmodel.findOne({ user: req.user._id });
  if (!iscartexist) {
    let cart = new cartmodel({
      user: req.user._id,
      cartItem: [req.body],
    });
    calctotalprice(cart);
    await cart.save();
    !cart && res.status(404).json({ message: "cart not found" });
    cart && res.json({ message: "success", cart });
  } else {
    let item = iscartexist.cartItem.find(
      (item) => item.product == req.body.product
    );
    if (item) {
      if (item.quantity >= product.quantity)
        return next(new AppError("sold out !", 404));
      item.quantity += req.body.quantity || 1;
    } else iscartexist.cartItem.push(req.body);
    calctotalprice(iscartexist);
    await iscartexist.save();
    res.json({ message: "success", cart: iscartexist });
  }
});
const removeitemfromcart = catcherror(async (req, res, next) => {
  let cart = await cartmodel.findOneAndUpdate(
    { user: req.user.id },
    { $pull: { cartItem: req.params.id } },
    { new: true }
  );
  calctotalprice(cart);
  await cart.save();
  !cart && res.status(404).json({ message: "item not found" });
  cart && res.json({ message: "Deleted!", cart });
});
const updatequantity = catcherror(async (req, res, next) => {
  let cart = await cartmodel.findOne({ user: req.user._id });
  !cart && res.status(404).json({ message: "cart not found" });
  let item = cart.cartItem.find((item) => item._id == req.params.id);
  if (!item) return next(new AppError("sold out!", 404));
  item.quantity = req.body.quantity;
  calctotalprice(cart);
  await cart.save();
  cart && res.json({ message: "updated!", cart });
});
const getLoggetUsercart = catcherror(async (req, res, next) => {
  let cart = await cartmodel
    .findOne({ user: req.user._id })
    .populate("cartItem.product");
  !cart && res.status(404).json({ message: "cart not found" });
  cart && res.json({ message: "success", cart });
});
const clearUsercart = catcherror(async (req, res, next) => {
  let cart = await cartmodel.findOneAndDelete({ user: req.user._id });
  !cart && res.status(404).json({ message: "cart not found" });
  cart && res.json({ message: "Deleted!", cart });
});
const applyCoupon = catcherror(async (req, res, next) => {
  let coupon = await cartmodel.findOne({
    code: req.body.coupon,
    expires: { $gte: Date.now() },
  });
  !coupon && res.status(404).json({ message: "cart not found" });
  let cart = await cartmodel.findOne({ user: req.user._id });

  !cart && res.status(404).json({ message: "cart not found" });
  cart && res.json({ message: "Deleted!", cart });
  let totalPriceAfterDiscount =
    cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  cart.discount = coupon.discount;
  await cart.save();
  res.json({ message: "success", cart });
});
export {
  addcart,
  removeitemfromcart,
  clearUsercart,
  getLoggetUsercart,
  updatequantity,
};
