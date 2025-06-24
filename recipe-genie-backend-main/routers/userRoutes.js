const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, getUserRecipes, addToFavorites, removeFromFavorites, getUserFavorites } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// User routes
router.post('/register', registerUser); // POST request for user registration
router.post('/login', loginUser); // POST request for user login

// Protected routes (require authentication)
router.get('/profile', protect, getUserProfile); // Get user profile
router.put('/profile', protect, updateUserProfile); // Update user profile
router.get('/recipes', protect, getUserRecipes); // Get user's recipes
router.get('/favorites', protect, getUserFavorites); // Get user's favorite recipes
router.post('/favorites', protect, addToFavorites); // Add recipe to favorites
router.delete('/favorites/:recipeId', protect, removeFromFavorites); // Remove recipe from favorites

module.exports = router;