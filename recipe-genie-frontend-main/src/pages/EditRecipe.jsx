import React, { useEffect, useState } from 'react';
import { getRecipeById, updateRecipe } from '../services/recipeService';
import { useNavigate, useParams } from 'react-router-dom';
import './EditRecipe.css';

const EditRecipe = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchRecipe = async () => {
      try {
        const recipe = await getRecipeById(id);
        if (recipe.user._id !== user.id) {
          navigate('/');
          return;
        }
        setTitle(recipe.name);
        setInstructions(recipe.instructions);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        navigate('/');
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', title);
    formData.append('instructions', instructions);
    if (image) formData.append('image', image);

    try {
      await updateRecipe(id, formData);
      navigate(`/recipe/${id}`);
    } catch (err) {
      alert('Failed to update recipe');
    }
  };

  return (
    <div className="edit-recipe-container">
      <div className="edit-form-wrapper">
        <div className="form-header">
          <h2 className="form-title">Edit Recipe</h2>
          <p className="form-subtitle">Update your culinary masterpiece</p>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label className="form-label">Recipe Title</label>
            <input
              type="text"
              placeholder="Enter recipe title"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Instructions</label>
            <textarea
              placeholder="Enter cooking instructions"
              className="form-textarea"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Update Image</label>
            <div className="image-upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              {previewImage && (
                <div className="image-preview">
                  <img src={previewImage} alt="Recipe preview" />
                </div>
              )}
            </div>
          </div>

          <div className="button-group">
            <button type="button" onClick={() => navigate(`/recipe/${id}`)} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
