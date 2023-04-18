import React from 'react';
import './SmallHeader.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg'
import LogoutButton from './Logout';

const SmallHeader = ({token}) => {
  return (
    <div>
    <header >
      <Logo className="logo" />
      <h1>
        <a href="/" className="link">
          Snow Chat
        </a>
      </h1>
    </header>
      {!token && <div className="auth-buttons-container">
        <Link to="/login" className="auth-button login">
          Login
        </Link>
        <Link to="/register" className="auth-button register">
          Register
        </Link>
      </div>}
      {token && <div className='auth-buttons-container'>
        <LogoutButton />
        </div>}
</div>
  );
};

export default SmallHeader;
