import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRecipes } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import './RecipeList.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?search=${encodeURIComponent(searchInput)}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipes(searchQuery);
        setRecipes(data);
      } catch (error) {
        alert('Failed to fetch recipes: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading delicious recipes...</p>
      </div>
    );
  }

  return (
    <div className="recipe-list-container">
      <div className="recipe-list-header">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search recipes by name..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        
        {searchQuery ? (
          <>
            <h2 className="page-title">Search Results: "{searchQuery}"</h2>
            <p className="page-subtitle">Found {recipes.length} recipe(s) matching your search</p>
          </>
        ) : (
          <>
            <h2 className="page-title">Discover Amazing Recipes</h2>
            <p className="page-subtitle">Explore our collection of delicious recipes shared by our community</p>
          </>
        )}
      </div>

      {recipes.length === 0 ? (
        <div className="no-recipes">
          {searchQuery ? (
            <>
              <p>No recipes found matching "{searchQuery}".</p>
              <p>Try a different search term or browse all recipes.</p>
            </>
          ) : (
            <>
              <p>No recipes found.</p>
              <p>Be the first to share a recipe!</p>
            </>
          )}
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

export default RecipeList;
