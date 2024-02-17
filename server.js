process.on("uncaughtException", (err) => {
  console.log("error", err);
});
import express from "express";
import { dbconnection } from "./databases/db_connection.js";
import { bootstrap } from "./src/modules/bootstrap/index.route.js";
import { globalerror } from "./src/middleware/globalerror.js";
import { AppError } from "./src/utils/apperror.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const port = 3000;
// echo "# ECCO" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/ayah125/ECCO.git
// git push -u origin main
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
bootstrap(app);
app.use(globalerror);
app.use("*", (req, res, next) => {
  next(new AppError(` error cant find : ${req.originalUrl}`, 404));
});
process.on("unhandledRejection", (err) => {
  console.log("error", err);
});
dbconnection();
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
