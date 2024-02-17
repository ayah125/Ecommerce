import mongoose from "mongoose";

mongoose;
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    discount: {
      type: Number,
      required: true,
    },
    shippingAdress: {
      street: String,
      city: String,
      phone: String,
    },
    paymenttype: {
      type: String,
      enum: ["cash", "cart"],
      default: "cash",
    },
    isDeliveried: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    orderItem: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
        },
        price: Number,
        quantity: Number,
      },
    ],
    totalOrderPrice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number,
  },

  { timestamps: true, toJSON: { virtuals: true } }
);
orderSchema.virtual("product", {
  ref: "cart",
  localField: "orderItem.product",
  foreignField: "cartItem.product",
});
export const ordermodel = mongoose.model("order", orderSchema);
