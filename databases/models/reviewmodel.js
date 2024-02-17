import mongoose from "mongoose";

mongoose;
const reviewSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      minLenght: [10, "too short review"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
    image: {
      type: String,
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);
reviewSchema.pre(/^find/, function () {
  this.populate("user", "name");
});
export const reviewmodel = mongoose.model("review", reviewSchema);
