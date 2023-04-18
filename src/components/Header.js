import React from 'react';
import {ReactComponent as Logo} from '../assets/logo.svg'

const Header = () => {
  return (
    <header className="icon-text-container">
      <Logo className="logo" />
      <h1 className="title"><a href= '/' className='link'>TRIBE WATCH</a></h1>
    </header>
  );
};

export default Header;
