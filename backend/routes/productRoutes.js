const express = require('express');
const router = express.Router();
const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  createProductReview,
  searchProducts,
  getTopProducts,
} = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, setProduct);

router.get('/top', getTopProducts);
router
  .route('/:id')
  .delete(protect, deleteProduct)
  .put(protect, protect, updateProduct)
  .get(getProductById);

router.post('/:id/reviews', protect, createProductReview);
router.get('/search=:keyword', searchProducts);

module.exports = router;
