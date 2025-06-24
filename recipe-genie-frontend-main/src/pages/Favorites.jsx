import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserFavorites, removeFromFavorites } from '../services/userService';
import RecipeCard from '../components/RecipeCard';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getUserFavorites();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError('Failed to load favorite recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (recipeId) => {
    try {
      await removeFromFavorites(recipeId);
      setFavorites(favorites.filter(recipe => recipe._id !== recipeId));
    } catch (error) {
      console.error('Error removing favorite:', error);
      setError('Failed to remove from favorites');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading favorite recipes...</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1 className="favorites-title">My Favorite Recipes</h1>
        <p className="favorites-subtitle">Your collection of recipes you've liked</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>You don't have any favorite recipes yet.</p>
          <Link to="/recipes" className="browse-recipes-link">
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((recipe) => (
            <div key={recipe._id} className="favorite-item">
              <RecipeCard recipe={recipe} />
              <button 
                className="remove-favorite-button"
                onClick={() => handleRemoveFavorite(recipe._id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;