import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import Operations from './Operations';
import DownloadReport from './DownloadReport';
import Sidebar from './Sidebar';
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
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
      <div className="panel bg-mcblack p-10 flex rounded-lg">
        {!isAuthPage && <Sidebar setToken={setToken} />}
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route path="/operations" element={<Operations token={token} />} />
          <Route path="/download-report" element={<DownloadReport />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
