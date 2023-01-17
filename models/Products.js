import mongoose from "mongoose";
const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: [String],
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    Color: {
      type: [String],
    },
    Size: {
      type: [String],
    },
    Quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
      required: true,
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
