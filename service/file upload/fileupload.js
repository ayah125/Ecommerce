import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../src/utils/apperror.js";
const fileupload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "_" + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("images only!", 401), false);
    }
  }
  const upload = multer({ storage, fileFilter });
  return upload;
};
export const uploadsinglefile = (fieldname) => fileupload().single(fieldname);
export const uploadarrayfile = (fieldname) => fileupload().array(fieldname);
export const uploadfileds = (fieldname) => fileupload().fields(fieldname);
