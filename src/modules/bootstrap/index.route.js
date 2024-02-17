import { globalerror } from "../../middleware/globalerror.js";
import productroute from "../../product/productroutes.js";
import addressRouter from "../addresses/address.routes.js";

import authRouter from "../auth/auth.route.js";
import brandroute from "../brand/brandroutes.js";
import cartRouter from "../cart/cart.routes.js";
import categoryroute from "../category/categoryroutes.js";
import couponroute from "../coupon/coupon.routes.js";
import orderRouter from "../order/order.routes.js";
import reviewroute from "../review/reviewroutes.js";
import subcategoryroute from "../subcategory/subcategoryroutes.js";
import userRoute from "../user/userroute.js";
import whishlistRouter from "../wishlist/wishlistroutes.js";

export const bootstrap = (app) => {
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/api/v1/categories", categoryroute);
  app.use(globalerror);
  app.use("/api/v1/subcategories", subcategoryroute);
  app.use("/api/v1/brands", brandroute);
  app.use("/api/v1/products", productroute);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/review", reviewroute);
  app.use("/api/v1/wishlist", whishlistRouter);
  app.use("/api/v1/address", addressRouter);
  app.use("/api/v1/coupon", couponroute);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/order", orderRouter);
};
