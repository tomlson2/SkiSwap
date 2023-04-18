import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import SmallHeader from './SmallHeader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset the error message

    try {
      const response = await axios.post('/api/login', { email, password });
      console.log(response.data);

      history.push('/');
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
      setError('Failed to login. Please check your email and password.');
    }
  };

  return (
    <div className="log">
      <SmallHeader/>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
