const express = require('express');
const { addRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, getRecipesByUserId } = require('../controllers/recipeController');
const { protect } = require('../middlewares/authMiddleware'); // For protecting routes with JWT
const upload = require('../middlewares/fileUpload'); // For file upload middleware

const router = express.Router();

// Routes for recipes
router.post('/', protect, upload.single('image'), addRecipe); // Add a new recipe
router.get('/', getAllRecipes); // Get all recipes
router.get('/user/:userId', getRecipesByUserId); // Get all recipes by a specific user
router.get('/:id', getRecipeById); // Get a single recipe by ID
router.put('/:id', protect, upload.single('image'), updateRecipe); // Update a recipe
router.delete('/:id', protect, deleteRecipe); // Delete a recipe

module.exports = router;
