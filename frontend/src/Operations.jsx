import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrashAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import AddOperation from './AddOperation';

function Operations({ token }) {
  const [showForm, setShowForm] = useState(false);
  const [operations, setOperations] = useState([]);
  const [newOperation, setNewOperation] = useState({
    title: '',
    amount: '',
    type: 'expense',
    date: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/operations/get', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOperations(response.data);
      } catch (error) {
        console.error('Ошибка получения операций пользователя:', error.response?.data?.detail || error.message);
      }
    };

    if (token) {
      fetchOperations();
    }
  }, [token]);

  const handleAddOperation = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/operations/add', newOperation, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOperations([...operations, response.data]);
      setShowForm(false);
      setNewOperation({ title: '', amount: '', type: 'expense', date: '' });
    } catch (error) {
      console.error('Ошибка добавления операции:', error.response?.data?.detail || error.message);
    }
  };

  const handleDeleteOperation = async (operationId) => {
    try {
      await axios.delete(`http://localhost:8000/api/operations/delete${operationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOperations(operations.filter(operation => operation.id !== operationId));
    } catch (error) {
      console.error('Ошибка удаления операции:', error.response?.data?.detail || error.message);
    }
  };

  const handleChange = (e) => {
    setNewOperation({ ...newOperation, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOperations = operations.filter(operation => {
    return operation.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="text-white flex flex-col items-center">
      <div className="flex justify-between items-center bg-mcgray p-3 rounded-lg mb-3 w-full box-border focus-within:ring-2 focus-within:ring-mgreen">
        <input
          type="text"
          id="search"
          placeholder="Конкретная операция..."
          className="bg-mcgray text-white border-none placeholder-white focus:outline-none"
          value={searchTerm}
          onChange={handleSearch}
        />
        <FaSearch className="text-white" />
      </div>
      <div className="overflow-x-auto mb-3">
        <table className="min-w-full bg-mcgray rounded-lg text-white">
          <thead>
            <tr>
              <th className="p-2 text-left">Цена</th>
              <th className="p-2 text-left">Категория</th>
              <th className="p-2 text-left">Дата</th>
              <th className="p-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOperations.map((operation) => (
              <tr key={operation.id}>
                <td className="p-2 flex items-center">
                  {operation.type === 'income' ? (
                    <FaArrowUp className="text-green-500" />
                  ) : (
                    <FaArrowDown className="text-red-500" />
                  )}
                  {operation.amount}₽
                </td>
                <td className="p-2">{operation.title}</td>
                <td className="p-2">{new Date(operation.date).toLocaleDateString()}</td>
                <td className="p-2">
                  <button
                    className="bg-mcgray border-none rounded-lg focus:outline-none cursor-pointer"
                    onClick={() => handleDeleteOperation(operation.id)}
                  >
                    <FaTrashAlt className="text-red-600 w-5 h-5 hover:text-red-800" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="">
        <button
          onClick={() => setShowForm(true)}
          className="bg-mcgray text-white p-3 rounded-lg border-none hover:bg-mgreen"
        >
          Добавить операцию
        </button>
      </div>

      {showForm && (
        <AddOperation
          handleCancel={handleCancel}
          handleAddOperation={handleAddOperation}
          handleChange={handleChange}
          newOperation={newOperation}
        />
      )}
    </div>
  );
}

export default Operations;
