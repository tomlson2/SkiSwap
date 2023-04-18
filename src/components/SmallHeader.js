import React from 'react';
import './SmallHeader.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg'

const SmallHeader = () => {
  return (
    <header className="small-icon-text-container">
      <Logo className="logo" />
      <h1 className="title">
        <a href="/" className="link">
          Snow Chat
        </a>
      </h1>
      <div className="auth-buttons-container">
        <Link to="/login" className="auth-button login">
          Login
        </Link>
        <Link to="/register" className="auth-button register">
          Register
        </Link>
      </div>
    </header>
  );
};

export default SmallHeader;
