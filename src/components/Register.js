import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/users', { name, email, password });
        console.log(response.data);
      } catch (error) {
        console.error('Registration failed:', error.response.data.error);
      }
    };
    return (
        <div className="register">
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
      );
};

export default Register;
