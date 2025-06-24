import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      alert(err.response.data.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="form-header">
          <h2 className="form-title">Create Account</h2>
          <p className="form-subtitle">Join our community of food lovers</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {[
            { name: 'name', icon: '👤' },
            { name: 'phone', icon: '📱' },
            { name: 'email', icon: '✉️' },
            { name: 'password', icon: '🔒' }
          ].map((field) => (
            <div className="form-group" key={field.name}>
              <label className="form-label">
                <span className="field-icon">{field.icon}</span>
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
              </label>
              <input
                type={field.name === 'password' ? 'password' : 'text'}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="form-input"
                placeholder={`Enter your ${field.name}`}
                required
              />
            </div>
          ))}

          <button type="submit" className="submit-button">
            Create Account
          </button>

          <p className="login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
