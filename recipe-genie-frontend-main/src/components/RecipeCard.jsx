import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe._id}`} className="recipe-link">
        <div className="image-container">
          <img 
            src={`${import.meta.env.VITE_API_URL}${recipe.image}`} 
            alt={recipe.name} 
            className="recipe-image"
          />
        </div>
        <div className="recipe-info">
          <h3 className="recipe-title">{recipe.name}</h3>
          <div className="recipe-meta">
            <span className="cook-time">30 mins</span>
            <span className="difficulty">Easy</span>
          </div>
          {recipe.user && (
            <Link to={`/user/${recipe.user._id}/recipes`} className="user-tag">
              By: {recipe.user.name}
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;
