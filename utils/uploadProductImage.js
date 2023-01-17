import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { createError } from "./errors.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "./../uploads/products");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});
const productFilter = (req, file, callback) => {
  if (file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "jpeg") {
    callback(null, true);
  } else {
    callback(createError(500, "Image type must be PNG or JPG"));
  }
};
export const uploads = multer({ storage: storage, limits: { fileSize: 50000000 }, fileFilter: productFilter });
