const API = import.meta.env.VITE_API_URL;

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token;
};

export const getRecipes = async (searchQuery = '') => {
  const url = searchQuery
    ? `${API}/api/recipes?search=${encodeURIComponent(searchQuery)}`
    : `${API}/api/recipes`;
  const res = await fetch(url);
  return res.json();
};

export const getRecipeById = async (id) => {
  const res = await fetch(`${API}/api/recipes/${id}`);
  if (!res.ok) throw new Error('Recipe not found');
  return res.json();
};

export const addRecipe = async (formData) => {
  const res = await fetch(`${API}/api/recipes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to add recipe');
  return res.json();
};

export const updateRecipe = async (id, formData) => {
  const res = await fetch(`${API}/api/recipes/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update recipe');
  return res.json();
};

export const deleteRecipe = async (id) => {
  const res = await fetch(`${API}/api/recipes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });
  if (!res.ok) throw new Error('Failed to delete recipe');
  return res.json();
};

export const getRecipesByUserId = async (userId) => {
  const res = await fetch(`${API}/api/recipes/user/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch user recipes');
  return res.json();
};
