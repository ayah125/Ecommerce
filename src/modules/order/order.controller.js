import { cartmodel } from "../../../databases/models/cartmodel.js";
import { ordermodel } from "../../../databases/models/ordermodel.js";
import { productmodel } from "../../../databases/models/productmodel.js";
import { catcherror } from "../../middleware/catcherror.js";
import { AppError } from "../../utils/apperror.js";

import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51OkEBFCWDSraXJpqcMzSUxii3k4ZPMQR0n7AlFMe08e1vNB6szvTOreipI86ewbNQcAzV8T5UvNRaaZ65fjzT35300qUcUCEzj"
);

const createcashorder = catcherror(async (req, res, next) => {
  //get cart
  let cart = await cartmodel.findById(req.params.id);
  if (!cart) return next(new AppError("sold out!", 404));
  //calc total order price
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalprice;
  //create order
  let order = new ordermodel({
    user: req.user._id,
    orderItem: cart.cartItem,
    totalOrderPrice,
    shippingAdress: req.body.shippingAdress,
  });
  await order.save();
  //calc sold and quantity
  let options = cart.cartItem.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod.product },
        update: { $inc: { sold: prod.quantity, quantity: -prod.quantity } },
      },
    };
  });
  await productmodel.bulkWrite(options);
  //clear cart
  await cartmodel.findByIdAndDelete(req.params.id);
  res.json({ message: "success", order });
});
const getspecificorder = catcherror(async (req, res, next) => {
  let order = await ordermodel
    .findOne({ user: req.user.id })
    .populate("product");
  res.json({ message: "success", order });
});
const getallorders = catcherror(async (req, res, next) => {
  let orders = await ordermodel.find().populate("product");
  res.json({ message: "success", orders });
});
const createCheckOutSession = catcherror(async (req, res, next) => {
  const cart = await cartmodel.findById(req.params.id);
  const orderprice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalprice;
  let sessions = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: orderprice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://www.npmjs.com/package/stripe",
    cancel_url: "https://dashboard.stripe.com/test/apikeys",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAdress,
  });
  res.json({ message: "success", sessions });
});
export {
  createcashorder,
  getspecificorder,
  getallorders,
  createCheckOutSession,
};
