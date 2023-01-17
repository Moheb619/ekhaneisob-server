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
export const getCategorizedProducts = async (req, res, next) => {
  try {
    const categorizedProducts = await Products.find({ category: req.query.category, sub_category: req.query.sub_category });
    console.log(categorizedProducts);
    res.status(200).json(categorizedProducts);
  } catch (err) {
    next(err);
  }
};
