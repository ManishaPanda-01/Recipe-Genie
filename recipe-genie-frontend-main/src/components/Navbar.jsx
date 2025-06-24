import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/recipes?search=${encodeURIComponent(searchTerm)}`);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="nav-logo">Recipe App</Link>
      </div>
      
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
      
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        {menuOpen ? '✕' : '☰'}
      </button>
      
      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/recipes" className={`nav-link ${location.pathname === '/recipes' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Recipes</Link>
        {user ? (
          <>
            <Link to="/add-recipe" className={`nav-link ${location.pathname === '/add-recipe' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Add Recipe</Link>
            <Link to="/favorites" className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Favorites</Link>
            <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Profile</Link>
            <button onClick={() => {handleLogout(); setMenuOpen(false);}} className="nav-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Register</Link>
            <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
