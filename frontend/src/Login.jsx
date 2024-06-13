import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        username,
        password,
      });
      setToken(response.data.access_token);
      navigate('/'); // Перенаправление на главную страницу
    } catch (error) {
      setError('Ошибка авторизации. Проверьте имя пользователя и пароль.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-mcblack p-10 rounded-lg">
        <h1 className="text-mgreen text-center mb-4 bg-mcgray p-4 rounded-lg">Money Tracker</h1>
        <h2 className="text-white text-center mb-4">Авторизация</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4 box-border focus-within:ring-2 focus-within:ring-mgreen rounded-lg">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full box-border placeholder-white p-3 rounded-lg border-none bg-mcgray text-white focus:outline-none"
              placeholder="Имя пользователя..."
              required
            />
          </div>
          <div className="mb-6 box-border focus-within:ring-2 focus-within:ring-mgreen rounded-lg">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full box-border placeholder-white p-3 rounded-lg border-none bg-mcgray text-white focus:outline-none"
              placeholder="Пароль..."
              required
            />
          </div>
          <div className="flex justify-between w-full">
            <Link
              to="/register"
              className="bg-mcgray border-none text-white p-3 rounded-lg hover:bg-mgreen no-underline"
            >
              Регистрация
            </Link>
            <button
              type="submit"
              className="bg-mcgray border-none text-white p-3 rounded-lg hover:bg-mgreen cursor-pointer"
            >
              Вход
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
