import mongoose from "mongoose";
export function dbconnection() {
  mongoose
    .connect(
      "mongodb+srv://ayah:S2j9urx-QNGUZWx@cluster0.14jwvfs.mongodb.net/test"
    )
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log("error:", err);
    });
}
//ayah
//S2j9urx-QNGUZWx
