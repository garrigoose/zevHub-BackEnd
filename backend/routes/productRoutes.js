const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  setProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, setProduct);

router
  .route('/:id')
  .delete(protect, deleteProduct)
  .put(protect, updateProduct)
  .get(getProduct);

module.exports = router;
