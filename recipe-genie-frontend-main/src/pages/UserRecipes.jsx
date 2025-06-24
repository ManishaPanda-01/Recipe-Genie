import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipesByUserId } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import './RecipeList.css'; // Reusing the same styles as RecipeList

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipesByUserId(userId);
        setRecipes(data.recipes);
        setUserName(data.userName);
      } catch (error) {
        alert('Failed to fetch recipes: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading recipes...</p>
      </div>
    );
  }

  return (
    <div className="recipe-list-container">
      <div className="recipe-list-header">
        <h2 className="page-title">Recipes by {userName}</h2>
        <p className="page-subtitle">
          {recipes.length > 0 
            ? `Showing ${recipes.length} recipe(s) shared by this user` 
            : 'This user has not shared any recipes yet'}
        </p>
        <Link to="/recipes" className="back-link">Back to all recipes</Link>
      </div>

      {recipes.length === 0 ? (
        <div className="no-recipes">
          <p>No recipes found for this user.</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRecipes;