const asyncHandler = require('express-async-handler');

const Product = require('../models/productModel');
const User = require('../models/userModel');

const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const multer = require('multer');

// CLOUDINARY x REACT

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     if (ext !== '.jpg' || ext !== '.png') {
//       return cb(res.status(400).end('only jpg, png are allowed'), false);
//     }
//     cb(null, true);
//   },
// });

// var upload = multer({ storage: storage }).single('file');

// @description     Get multiple products
// @route/moethod   GET /api/products
// @access          Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.status(200).json(products);
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

module.exports = {
  getProducts,
  getProductById,
  setProduct,
  updateProduct,
  deleteProduct,
};
