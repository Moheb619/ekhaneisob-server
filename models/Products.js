import mongoose from "mongoose";
const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    img1: {
      data: Buffer,
      contentType: String,
    },
    img2: {
      data: Buffer,
      contentType: String,
    },
    img3: {
      data: Buffer,
      contentType: String,
    },
    desc: {
      type: String,
      required: true,
    },
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
    },
    price: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("products", ProductsSchema);
