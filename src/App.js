import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={Home} />
            <Route path="/login" element={Login} />
            <Route path="/signup" element={Signup} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;