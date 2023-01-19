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
    short_desc: {
      type: String,
      required: true,
    },
    full_desc: {
      type: String,
      required: true,
    },
    product_more_details: {
      type: Object,
      required: true,
    },
    quantity: {
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
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("products", ProductsSchema);
