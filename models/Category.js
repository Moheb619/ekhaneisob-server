import mongoose from "mongoose";
const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    sub_category: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("categories", CategoriesSchema);
