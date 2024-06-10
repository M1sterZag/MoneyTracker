import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/auth/signup', {
        username,
        password,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Перенаправление через 3 секунды
    } catch (error) {
      if (error.response && error.response.data.detail === 'Username already exists') {
        setError('Пользователь с таким именем уже существует.');
      } else {
        setError('Ошибка регистрации. Попробуйте снова.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-mcblack p-10 rounded-lg">
        <h1 className="text-mgreen text-center mb-4 bg-mcgray p-4 rounded-lg">Money Tracker</h1>
        <h2 className="text-white text-center mb-4">Регистрация</h2>
        {success ? (
          <p className="text-green-500 text-center mb-4">
            Регистрация успешна! Вы будете перенаправлены на страницу входа.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-4">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full box-border placeholder-white p-3 rounded-lg border-none bg-mcgray text-white border border-mcgray"
                placeholder="Имя пользователя..."
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full box-border placeholder-white p-3 rounded-lg border-none bg-mcgray text-white border border-mcgray"
                placeholder="Пароль..."
                required
              />
            </div>
            <button
              type="submit"
              className="bg-mcgray border-none text-white p-3 rounded-lg hover:bg-mgreen w-full"
            >
              Регистрация
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
