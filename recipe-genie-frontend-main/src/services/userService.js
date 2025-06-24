const API = import.meta.env.VITE_API_URL;

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token;
};

// Get user profile
export const getUserProfile = async () => {
  const res = await fetch(`${API}/api/users/profile`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
};

// Update user profile
export const updateUserProfile = async (userData) => {
  const res = await fetch(`${API}/api/users/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
};

// Get user recipes
export const getUserRecipes = async () => {
  const res = await fetch(`${API}/api/users/recipes`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });
  if (!res.ok) throw new Error('Failed to fetch user recipes');
  return res.json();
};

// Get user favorites
export const getUserFavorites = async () => {
  const res = await fetch(`${API}/api/users/favorites`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });
  if (!res.ok) throw new Error('Failed to fetch favorites');
  return res.json();
};

// Add recipe to favorites
export const addToFavorites = async (recipeId) => {
  const res = await fetch(`${API}/api/users/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ recipeId }),
  });
  if (!res.ok) throw new Error('Failed to add to favorites');
  return res.json();
};

// Remove recipe from favorites
export const removeFromFavorites = async (recipeId) => {
  const res = await fetch(`${API}/api/users/favorites/${recipeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });
  if (!res.ok) throw new Error('Failed to remove from favorites');
  return res.json();
};