const API = import.meta.env.VITE_API_URL;

export const register = async (userData) => {
  const res = await fetch(`${API}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

export const login = async (userData) => {
  const res = await fetch(`${API}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
