import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function Header({ setToken, token }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error('Ошибка получения данных пользователя:', error.response?.data?.detail || error.message);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <div className="header bg-mcgray p-5 text-center flex justify-between items-center rounded-lg mx-64 mb-5">
      <h1 className="text-mgreen">Money Tracker</h1>
      <div className="flex items-center justify-center flex-grow">
        <NavLink to="/home" className="cursor-pointer no-underline text-white hover:text-mgreen mx-4" activeClassName="text-mgreen">
          <h2>Главная</h2>
        </NavLink>
        <NavLink to="/operations" className="cursor-pointer no-underline text-white hover:text-mgreen mx-4" activeClassName="text-mgreen">
          <h2>Операции</h2>
        </NavLink>
        <NavLink to="/graphics" className="cursor-pointer no-underline text-white hover:text-mgreen mx-4" activeClassName="text-mgreen">
          <h2>Графики</h2>
        </NavLink>
      </div>
      <div className="flex items-center">
        <h2 className="username text-white mr-4">{username}</h2>
        <button
          onClick={handleLogout}
          className="cursor-pointer no-underline text-white hover:text-red-600 bg-transparent border-none outline-none"
        >
          <h2>Выход</h2>
        </button>
      </div>
    </div>
  );
}

export default Header;
