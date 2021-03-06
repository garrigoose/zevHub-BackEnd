const asyncHandler = require('express-async-handler');

const Product = require('../models/productModel');
const User = require('../models/userModel');

// @description     Get multiple products by search criteria
// @route/moethod   GET /api/products/search=:keyword
// @access          Public
const searchProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
  } catch (err) {
    console.log(err);
  }

  res.status(200).json(products);
});

// @description     Get multiple products
// @route/moethod   GET /api/products
// @access          Public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

// @description     Get one product
// @route/moethod   GET /api/products/:id
// @access          Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// @desc    Create product
// @route   POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  //   if (!req.body) {
  //     res.status(400);
  //     throw new Error('Please add a text field');
  //   }
  //   const newProduct = { ...req.body, user };
  //   const newProduct = await Product.create({
  //     // ...req.body
  //     title: req.body.title,
  //     description: req.body.description,
  //     price: req.body.price,
  //     brand: req.body.brand,
  //     category: req.body.category,
  //     image: req.body.image,
  //     rating: req.body.rating,
  //     user: req.user.id,
  //   });

  const product = new Product({
    title: 'Sample name',
    price: 0,
    user: req.user._id,
    image:
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2322&q=80',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });
  // try {
  const createdProduct = await Product.create(product);
  res.status(201).json(createdProduct);
  // } catch (error) {
  //   res.status(404).json(error);
  // }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = asyncHandler(async (req, res) => {
  const { title, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error('Product not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the product user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  if (product) {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error('Product not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the product user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await product.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  console.log('hit get top products controller');
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  getProducts,
  getProductById,
  setProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  searchProducts,
  getTopProducts,
};
