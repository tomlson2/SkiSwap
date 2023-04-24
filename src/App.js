import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import Home from './components/Home';
import ServerDetails from './pages/ServerDetails';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/server/:serverId" element={<ServerDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
