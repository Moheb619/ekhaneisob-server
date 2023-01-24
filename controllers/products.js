import Category from "../models/Category.js";
import Products from "../models/Products.js";

export const createProduct = async (req, res, next) => {
  // details split
  const commaSepareteDetails = req.body.product_more_details.split("|");
  let equalSeparateDetails = {};
  for (let i = 0; i < commaSepareteDetails.length; i++) {
    const singleEqualSeparateDetail = commaSepareteDetails[i].split("=");
    equalSeparateDetails[singleEqualSeparateDetail[0]] = singleEqualSeparateDetail[1];
  }
  req.body.product_more_details = equalSeparateDetails;
  // image array create
  req.body.img = [];
  for (let i = 0; i < req.files.length; i++) {
    req.body.img.push("http://localhost:5000/uploads/products/" + req.files[i].filename);
  }
  if (req.body.featured === "true") {
    req.body.featured = true;
  } else {
    req.body.featured = false;
  }

  req.body.quantity = Number(req.body.quantity);
  req.body.price = Number(req.body.price);
  req.body.discount = Number(req.body.discount);
  const newProduct = new Products(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json(product);
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

export const getSearchedProducts = async (req, res, next) => {
  const search_string = req.query.name;
  try {
    const name = req.query.name || "";
    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const searchedProductsByName = await Products.find({
      ...nameFilter,
    });
    const categoryFilter = name ? { category: { $regex: name, $options: "i" } } : {};
    const searchedProductsByCategory = await Products.find({
      ...categoryFilter,
    });
    const subcategoryFilter = name ? { sub_category: { $regex: name, $options: "i" } } : {};
    const searchedProductsBySubCategory = await Products.find({
      ...subcategoryFilter,
    });

    const allSearchedProducts = searchedProductsByName.concat(searchedProductsByCategory, searchedProductsBySubCategory);
    res.status(200).json(allSearchedProducts);
  } catch (err) {
    next(err);
  }
};
export const getCategorizedProducts = async (req, res, next) => {
  try {
    const categorizedProducts = await Products.find({ category: req.query.category, sub_category: req.query.sub_category });
    res.status(200).json(categorizedProducts);
  } catch (err) {
    next(err);
  }
};

export const getLatestProducts = async (req, res, next) => {
  try {
    const todayDate = new Date();
    const latestMaximumDate = new Date(new Date().setDate(todayDate.getDate() - 30));
    const latestProduct = await Products.find({ createdAt: { $gt: latestMaximumDate } });
    res.status(200).json(latestProduct);
  } catch (err) {
    next(err);
  }
};
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const featuredProduct = await Products.find({ featured: true });
    res.status(200).json(featuredProduct);
  } catch (err) {
    next(err);
  }
};
