const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL of the uploaded image
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model to track who created the recipe
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;