import React, { useState } from 'react';
import './RecipeForm.css';

const RecipeForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [ingredients, setIngredients] = useState(initialData?.ingredients?.join(', ') || '');
  const [instructions, setInstructions] = useState(initialData?.instructions || '');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    if (image) formData.append('image', image);
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="recipe-form">
        <h2 className="form-title">{initialData ? 'Edit Recipe' : 'Create New Recipe'}</h2>
        
        <div className="form-group">
          <label className="form-label">Recipe Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Enter recipe title"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Ingredients</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="form-input"
            placeholder="Enter ingredients, separated by commas"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="form-textarea"
            placeholder="Enter cooking instructions"
            rows="6"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Recipe Image</label>
          <div className="image-upload-container">
            <input
              type="file"
              onChange={handleImageChange}
              className="file-input"
              accept="image/*"
            />
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="submit-button">
          {initialData ? 'Update Recipe' : 'Create Recipe'}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
