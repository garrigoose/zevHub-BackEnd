const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel.js');

// test get route
const getOrderTest = asyncHandler(async (req, res) => {
  res.json('orders route works');
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  console.log('addOrderItems hit');
  res.json('addOrderItems hit');
  //   const {
  //     orderItems,
  //     shippingAddress,
  //     paymentMethod,
  //     itemsPrice,
  //     taxPrice,
  //     shippingPrice,
  //     totalPrice,
  //   } = req.body;

  //   if (orderItems && orderItems.length === 0) {
  //     res.status(400);
  //     throw new Error('No order items');
  //     return;
  //   } else {
  //     const order = new Order({
  //       orderItems,
  //       buyer: req.user._id,
  //       shippingAddress,
  //       paymentMethod,
  //       itemsPrice,
  //       taxPrice,
  //       shippingPrice,
  //       totalPrice,
  //     });

  //     const createdOrder = await order.save();

  //     res.status(201).json(createdOrder);
  //   }
});

module.exports = { addOrderItems, getOrderTest };
