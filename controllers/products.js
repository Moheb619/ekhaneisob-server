import Category from "../models/Category.js";
import Products from "../models/Products.js";

export const createProduct = async (req, res, next) => {
  req.body.img = [];
  for (let i = 0; i < req.files.length; i++) {
    req.body.img.push("http://localhost:5000/uploads/products/" + req.files[i].filename);
  }
  if (req.body.feature === "true") {
    req.body.feature = true;
  } else {
    req.body.feature = false;
  }
  // console.log(req.body);
  const newProduct = new Products(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
