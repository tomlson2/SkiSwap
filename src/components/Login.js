import React from 'react';
import axios from 'axios';

import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/login', { email, password })
      .then(response => {
        console.log(response);
        // TODO: Handle successful login
      })
      .catch(error => {
        console.log(error);
        // TODO: Handle error
      });
  }

  return (
    <div>
      <h1>Log in to Tasky</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" name="email" value={email} onChange={event => setEmail(event.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Log in</button>
      </form>
    </div>
  );
}

export default Login;
