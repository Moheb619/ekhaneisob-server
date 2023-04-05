import Carts from "../models/Carts.js";

export const addToCart = async (req, res, next) => {
  try {
    const newCart = new Carts({
      ...req.body,
    });
    console.log(newCart);
    await newCart.save();
    res.status(200).json({ message: "Cart has been created." });
  } catch (err) {
    next(err);
  }
};
