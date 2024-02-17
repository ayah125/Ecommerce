import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
categorySchema.post("init", function (doc) {
  doc.image = process.env.BASEURL + "uploads/" + doc.image;
});
export const categorymodel = mongoose.model("category", categorySchema);
