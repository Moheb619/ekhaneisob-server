import mongoose from "mongoose";
const CartsSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("carts", CartsSchema);
