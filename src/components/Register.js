import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SmallHeader from './SmallHeader';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const history = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/users', { email, password });
        history('/');
      } catch (error) {
        console.error('Registration failed:', error.response.data.error);
      }
    };
    return (
      <div>
          <SmallHeader />
        <div className="reg">
          <form onSubmit={handleSubmit} className="register-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
            />
            <button type="submit" className="register-submit">Register</button>
          </form>
        </div>
      </div>
      );
};

export default Register;
