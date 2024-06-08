// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="header rounded-lg bg-mcgray mr-5 p-5 text-center flex flex-col justify-between">
      <div>
        <h1 className="text-mgreen mb-2">Money Tracker</h1>
        <h2 className="username text-white">MaxZag</h2>
      </div>
      <div className="options text-white flex-grow flex flex-col justify-center">
        <NavLink to="/" className="cursor-pointer no-underline text-white hover:text-mgreen" activeClassName="text-mgreen">
          <h2>Главная</h2>
        </NavLink>
        <NavLink to="/operations" className="cursor-pointer no-underline text-white hover:text-mgreen" activeClassName="text-mgreen">
          <h2>Операции</h2>
        </NavLink>
        <NavLink to="/download-report" className="cursor-pointer no-underline text-white hover:text-mgreen" activeClassName="text-mgreen">
          <h2>Скачать отчет</h2>
        </NavLink>
      </div>
      <NavLink to="/login" className="cursor-pointer no-underline text-white hover:text-red-600" activeClassName="text-mgreen mt-auto">
        <h2>Выход</h2>
      </NavLink>
    </div>
  );
}

export default Sidebar;
