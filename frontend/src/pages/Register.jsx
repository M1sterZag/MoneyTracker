import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Пароли не совпадают.');
      return;
    }
    try {
      await axios.post('http://app:8000/api/auth/signup', {
        username,
        password,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data.detail === 'Username already exists') {
        setError('Пользователь с таким именем уже существует.');
      } else {
        setError('Ошибка регистрации. Попробуйте снова.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/');
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
            <div className="mb-4 box-border focus-within:ring-2 focus-within:ring-mgreen rounded-lg">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full box-border placeholder-white p-3 rounded-lg border-none bg-mcgray text-white text-lg focus:outline-none"
                placeholder="Имя пользователя..."
                required
              />
            </div>
            <div className="mb-4 box-border focus-within:ring-2 focus-within:ring-mgreen rounded-lg">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full box-border placeholder-white p-3 rounded-lg border-none bg-mcgray text-white text-lg focus:outline-none"
                placeholder="Пароль..."
                required
              />
            </div>
            <div className="mb-6 box-border focus-within:ring-2 focus-within:ring-mgreen rounded-lg">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full box-border placeholder-white p-3 rounded-lg border-none bg-mcgray text-white text-lg focus:outline-none"
                placeholder="Повторите пароль..."
                required
              />
            </div>
            <div className="flex justify-between w-full">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-mcgray border-none text-white p-3 rounded-lg hover:bg-red-700 w-full cursor-pointer text-lg mr-2"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="bg-mcgray border-none text-white p-3 rounded-lg hover:bg-mgreen w-full cursor-pointer text-lg ml-2"
              >
                Регистрация
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
