import React from 'react';
import Cookies from 'js-cookie';

const LogoutButton = () => {
  const handleLogout = () => {
    Cookies.remove("authToken");
    window.location.reload();
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
