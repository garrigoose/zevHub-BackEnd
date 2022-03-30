const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/', protect, admin, getUsers);
router.put('/profile', protect, updateUserProfile);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
