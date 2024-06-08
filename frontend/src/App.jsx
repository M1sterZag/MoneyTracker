// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Operations from './Operations';
import DownloadReport from './DownloadReport';
import Sidebar from './Sidebar';
import Login from './Login';

function App() {
  return (
    <Router>
      <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
        <div className="panel bg-mcblack p-10 flex rounded-lg">
          <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/operations" element={<Operations />} />
              <Route path="/download-report" element={<DownloadReport />} />
              <Route path="/login" element={<Login />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
