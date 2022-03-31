const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  getOrders,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, addOrderItems);
router.get('/', protect, admin, getOrders);
router.get('/:id', protect, getOrderById);
router.get('/myorders', getMyOrders);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

module.exports = router;
