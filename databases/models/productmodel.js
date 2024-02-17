import mongoose from "mongoose";

mongoose;
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLenght: [10, "too short"],
      maxLength: [200, "too long!"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minLenght: [10, "too short"],
      maxLength: [200, "too long!"],
    },
    imgcover: String,
    images: [],
    price: {
      type: Number,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
      required: true,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    sold: Number,
    rateAvg: {
      type: Number,
      max: 5,
      min: 0,
    },
    ratecount: {
      type: Number,
      min: 0,
    },
    rateCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    subcategory: {
      type: mongoose.Types.ObjectId,
      ref: "subcategory",
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },

  { timestamps: true, toJSON: { virtuals: true } }
);

productSchema.post("init", function (doc) {
  if (doc.imgcover || doc.images) {
    doc.imgcover = process.env.BASEURL + "uploads/" + doc.imgcover;
    doc.images = doc.images?.map(
      (img) => process.env.BASEURL + "uploads/" + img
    );
  }
});
productSchema.virtual("myreview", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});
productSchema.pre("findOne", function () {
  this.populate("myreview");
});
export const productmodel = mongoose.model("product", productSchema);
