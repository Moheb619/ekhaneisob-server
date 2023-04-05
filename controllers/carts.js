import Cart from "../models/Carts.js";

export const addToCart = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
