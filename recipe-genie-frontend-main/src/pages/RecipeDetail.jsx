import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipeById, deleteRecipe } from '../services/recipeService';
import { addToFavorites, removeFromFavorites } from '../services/userService';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import './RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipeById(id);
      setRecipe(data);
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteRecipe(id);
      navigate('/');
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete recipe');
    }
    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (user && recipe) {
      setIsFavorite(user.favorites?.includes(recipe._id));
    }
  }, [user, recipe]);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(recipe._id);
      } else {
        await addToFavorites(recipe._id);
      }
      setIsFavorite(!isFavorite);
      
      // Update user in localStorage with the new favorites
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      if (updatedUser) {
        if (!updatedUser.favorites) updatedUser.favorites = [];
        
        if (isFavorite) {
          updatedUser.favorites = updatedUser.favorites.filter(id => id !== recipe._id);
        } else {
          updatedUser.favorites.push(recipe._id);
        }
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Failed to update favorites:', error);
    }
  };

  if (!recipe) return <div className="loading">Loading...</div>;

  return (
    <div className="recipe-detail-container">
      <div className="recipe-card">
        <div className="recipe-image-container">
          <img 
            src={`${import.meta.env.VITE_API_URL}${recipe.image}`} 
            alt={recipe.name} 
            className="recipe-image"
            loading="lazy"
          />
        </div>
        
        <div className="recipe-content">
          <h1 className="recipe-title">{recipe.name}</h1>
          {recipe.user && (
            <Link to={`/user/${recipe.user._id}/recipes`} className="user-tag detail-user-tag">
              Created by: {recipe.user.name}
            </Link>
          )}
          <div className="recipe-section">
            <h2 className="section-title">Instructions</h2>
            <p className="instructions-text">{recipe.instructions}</p>
          </div>

          <div className="action-buttons">
            <button 
              onClick={handleFavorite}
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
            </button>
            
            {user && user.id === recipe.user?._id && (
              <div className="owner-actions">
                <button 
                  onClick={() => navigate(`/edit-recipe/${id}`)}
                  className="edit-button"
                  aria-label="Edit recipe"
                >
                  Edit Recipe
                </button>
                <button 
                  onClick={() => setShowDeleteModal(true)} 
                  className="delete-button"
                  aria-label="Delete recipe"
                >
                  Delete Recipe
                </button>
                <DeleteConfirmModal
                  isOpen={showDeleteModal}
                  onClose={() => setShowDeleteModal(false)}
                  onConfirm={handleDelete}
                  recipeName={recipe.name}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

}

export default RecipeDetail;
