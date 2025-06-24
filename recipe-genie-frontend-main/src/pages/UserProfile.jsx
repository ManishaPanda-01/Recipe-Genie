import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile, updateUserProfile, getUserRecipes } from '../services/userService';
import RecipeCard from '../components/RecipeCard';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('recipes');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
        setFormData({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        });

        const recipes = await getUserRecipes();
        setUserRecipes(recipes);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await updateUserProfile(formData);
      setUser(response.user);
      setEditMode(false);
      setSuccess('Profile updated successfully');
    } catch (error) {
      console.error('Update failed:', error);
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">My Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <h2 className="profile-name">{user?.name}</h2>
            <p className="profile-email">{user?.email}</p>
            <button 
              className="edit-profile-button"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="profile-tabs">
            <button 
              className={`tab-button ${activeTab === 'recipes' ? 'active' : ''}`}
              onClick={() => setActiveTab('recipes')}
            >
              My Recipes
            </button>
            <Link to="/favorites" className="tab-button">
              My Favorites
            </Link>
          </div>
        </div>

        <div className="profile-main">
          {editMode ? (
            <div className="edit-profile-section">
              <h2 className="section-title">Edit Profile</h2>
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <button type="submit" className="save-button">Save Changes</button>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
              </form>
            </div>
          ) : (
            <div className="recipes-section">
              <h2 className="section-title">My Recipes</h2>
              {userRecipes.length === 0 ? (
                <div className="no-recipes">
                  <p>You haven't added any recipes yet.</p>
                  <Link to="/add-recipe" className="add-recipe-link">
                    Add Your First Recipe
                  </Link>
                </div>
              ) : (
                <div className="recipe-grid">
                  {userRecipes.map((recipe) => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;