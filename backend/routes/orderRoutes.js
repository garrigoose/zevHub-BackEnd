const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderTest,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, addOrderItems);
// router.route('/').post(protect, addOrderItems);
// router.get('/', getOrderTest);

module.exports = router;
