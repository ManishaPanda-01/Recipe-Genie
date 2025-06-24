const Recipe = require('../models/Recipe');
const path = require('path');
const User = require('../models/User');

// Add a new recipe
const addRecipe = async (req, res) => {
  const { name, instructions } = req.body;
  const userId = req.user.id; // The logged-in user from the JWT

  try {
    // Check if name and instructions are provided
    if (!name || !instructions || !req.file) {
      return res.status(400).json({ message: 'Name, instructions and image are required' });
    }

    // Handle image upload
    const image = `/uploads/${req.file.filename}`;

    // Create the recipe
    const recipe = await Recipe.create({
      name,
      instructions,
      image,
      user: userId,
    });

    res.status(201).json({
      message: 'Recipe added successfully',
      recipe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    // If search parameter is provided, filter recipes by name
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }
    
    const recipes = await Recipe.find(query).populate('user', 'name email'); // Populate user details
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single recipe
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const recipe = await Recipe.findById(id).populate('user', 'name email');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get recipes by user ID
const getRecipesByUserId = async (req, res) => {
  const { userId } = req.params;
  
  try {
    // Find the user first to get their name
    const user = await User.findById(userId).select('name');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Find all recipes by this user
    const recipes = await Recipe.find({ user: userId }).populate('user', 'name email');
    
    res.json({
      userName: user.name,
      recipes: recipes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a recipe (only if the user is the one who created it)
const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, instructions } = req.body;
  const userId = req.user.id;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if the user is the creator of the recipe
    if (recipe.user.toString() !== userId) {
      return res.status(403).json({ message: 'You can only edit your own recipes' });
    }

    // Update the recipe details
    recipe.name = name || recipe.name;
    recipe.instructions = instructions || recipe.instructions;
    if (req.file) {
      recipe.image = `/uploads/${req.file.filename}`;
    }

    await recipe.save();
    res.json({
      message: 'Recipe updated successfully',
      recipe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a recipe (only if the user is the one who created it)
const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if the user is the creator of the recipe
    if (recipe.user.toString() !== userId) {
      return res.status(403).json({ message: 'You can only delete your own recipes' });
    }

    // Using deleteOne instead of deprecated remove() method
    await Recipe.deleteOne({ _id: id });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipesByUserId,
  updateRecipe,
  deleteRecipe,
};