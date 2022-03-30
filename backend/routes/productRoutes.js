const express = require('express');
const router = express.Router();
const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, setProduct);

router
  .route('/:id')
  .delete(protect, deleteProduct)
  .put(protect, protect, updateProduct)
  .get(getProductById);

module.exports = router;
