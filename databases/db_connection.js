import mongoose from "mongoose";
export function dbconnection() {
  mongoose
    .connect(
      "mongodb+srv://ayahh:dVFPYcxEha2Nn3K1@cluster0.14jwvfs.mongodb.net/test"
    )
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log("error:", err);
    });
}
//ayah
//dVFPYcxEha2Nn3K1
