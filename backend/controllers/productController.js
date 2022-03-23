const asyncHandler = require('express-async-handler');

const Product = require('../models/productModel');
const User = require('../models/userModel');

const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const multer = require('multer');

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

// @description     Get products
// @route/moethod   GET /api/products
// @access          Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id });

  res.status(200).json(products);
});

// @description     Get product
// @route/moethod   GET /api/products/:id
// @access          Private
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json(product);
});

// @desc    Set product
// @route   POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const product = await Product.create({
    ...req.body,
    // title: req.body.text,
    // description: req.body.description,
    // price: req.body.price,
    // user: req.user.id,
  });

  console.log(product);

  //   upload(req, res, (err) => {
  //     if (err) {
  //       return res.json({ success: false, err });
  //     }
  //     return res.json({
  //       success: true,
  //       image: res.req.file.path,
  //       fileName: res.req.file.filename,
  //     });
  //   });

  res.status(200).json(product);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = asyncHandler(async (req, res) => {
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

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedProduct);
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
  getProduct,
  setProduct,
  updateProduct,
  deleteProduct,
};
