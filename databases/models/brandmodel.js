import mongoose from "mongoose";

mongoose;
const brandschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      unique: [true, "the name is required"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    image: {
      type: String,
    },
    logo: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
brandschema.post("init", function (doc) {
  doc.logo = process.env.BASEURL + "uploads/" + doc.logo;
});
export const brandmodel = mongoose.model("brands", brandschema);
