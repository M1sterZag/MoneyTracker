import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import Operations from './Operations';
import Graphics from './Graphics.jsx';
import Header from './Header.jsx';
import Login from './Login';
import Register from './Register';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <AppContent token={token} setToken={setToken} />
    </Router>
  );
}

function AppContent({ token, setToken }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <div className="flex flex-col items-center">
      {!isAuthPage && <Header setToken={setToken} token={token} />}
      <div className="flex flex-1 justify-center items-center w-full max-w-5xl">
          <Routes>
            <Route path="/home" element={<Home token={token} />} />
            <Route path="/operations" element={<Operations token={token} />} />
            <Route path="/graphics" element={<Graphics token={token} />} />
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
