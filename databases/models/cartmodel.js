import mongoose from "mongoose";

mongoose;
const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    discount: {
      type: Number,
      required: true,
    },
    cartItem: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
        },
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalprice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
export const cartmodel = mongoose.model("cart", CartSchema);
