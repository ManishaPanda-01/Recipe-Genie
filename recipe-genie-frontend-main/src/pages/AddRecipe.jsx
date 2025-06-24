import React, { useState, useEffect } from 'react';
import { addRecipe } from '../services/recipeService';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

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
    if (!name || !instructions || !image) {
      alert('Please fill all fields and upload an image');
      return;
    }
    formData.append('name', name);
    formData.append('instructions', instructions);
    formData.append('image', image);

    try {
      await addRecipe(formData);
      navigate('/');
    } catch (err) {
      alert('Failed to add recipe');
    }
  };

  return (
    <div className="add-recipe-container">
      <div className="recipe-form-wrapper">
        <div className="form-header">
          <h2 className="form-title">Create New Recipe</h2>
          <p className="form-subtitle">Share your culinary masterpiece with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Recipe Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your recipe name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="instructions" className="form-label">Cooking Instructions</label>
            <textarea
              id="instructions"
              placeholder="Describe your cooking process step by step"
              className="form-textarea"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">Recipe Image</label>
            <div className="image-upload-area">
              <input
                id="image"
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

          <button type="submit" className="submit-button">
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
