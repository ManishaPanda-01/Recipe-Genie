import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(formData);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError(err.message.includes('401') ? 'Invalid email or password' : 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please sign in to continue</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          {['email', 'password'].map((field) => (
            <div className="form-group" key={field}>
              <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="form-input"
                placeholder={`Enter your ${field}`}
                required
              />
            </div>
          ))}
          <button type="submit" className="login-button">Sign In</button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
