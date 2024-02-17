import mongoose from "mongoose";
import bcrypt from "bcrypt";

mongoose;
const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLenght: [10, "too short review"],
    },
    passwordChangedAt: Date,
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    age: {
      type: Number,
      min: [10, "too small to enter"],
      max: [80, "too old to enter"],
    },
    userID: mongoose.Types.ObjectId,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    verifyemail: {
      type: Boolean,
      default: false,
    },
    isblocked: {
      type: Boolean,
      default: false,
    },
    confirmemail: {
      type: Boolean,
      default: false,
    },
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "product" }],
    addresses: [
      {
        phone: String,
        street: String,
        city: String,
      },
    ],
  },
  { timestamps: true }
);
// userschema.findSimilarTypes=function(cb){return mongoose.model('animal').find({type:this.type},cb)}
userschema.pre("save", function () {
  if (this.password) bcrypt.hashSync(this.password, 8);
});
userschema.pre("findOneAndUpdate", function () {
  if (this._update.password) bcrypt.hashSync(this._update.password, 8);
});
export const usermodel = mongoose.model("user", userschema);
