import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="title">Welcome to Recipe Genie</h1>
        <p className="subtitle">Discover and share amazing recipes!</p>
        <div className="cta-buttons">
          <button className="cta-button primary" onClick={() => navigate('/recipes')}>Browse Recipes</button>
          <button className="cta-button secondary" onClick={() => navigate('/add-recipe')}>Share a Recipe</button>
        </div>
      </div>

    </div>
  );
};

export default Home;
