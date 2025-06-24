import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import UserProfile from './pages/UserProfile';
import Favorites from './pages/Favorites';
import UserRecipes from './pages/UserRecipes';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/user/:userId/recipes" element={<UserRecipes />} />
      </Routes>
      <ThemeToggle />
    </Router>
  );
}

export default App;
