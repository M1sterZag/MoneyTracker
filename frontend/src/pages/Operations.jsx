import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrashAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import AddOperation from './AddOperation.jsx';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOperations = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://app:8000/api/operations/get', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const sortedOperations = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOperations(sortedOperations);
      } catch (error) {
        console.error('Ошибка получения операций пользователя:', error.response?.data?.detail || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOperations();
    }
  }, [token]);

  const handleAddOperation = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://app:8000/api/operations/add', newOperation, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedOperations = [response.data, ...operations];
      const sortedOperations = updatedOperations.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOperations(sortedOperations);
      setShowForm(false);
      setNewOperation({ title: '', amount: '', type: 'expense', date: '' });
    } catch (error) {
      console.error('Ошибка добавления операции:', error.response?.data?.detail || error.message);
    }
  };

  const handleDeleteOperation = async (operationId) => {
    try {
      await axios.delete(`/app/api/operations/delete/${operationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedOperations = operations.filter(operation => operation.id !== operationId);
      setOperations(updatedOperations);
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
    <div className="text-white flex flex-col items-center w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-3 w-full">
        <div className="flex items-center w-full bg-mcgray p-3 rounded-lg box-border focus-within:ring-2 focus-within:ring-mgreen">
          <input
            type="text"
            id="search"
            placeholder="Конкретная операция..."
            className="bg-mcgray text-white border-none placeholder-white focus:outline-none w-full px-3 py-2 rounded-lg text-lg"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="text-white ml-2" />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-mcgray text-white p-3 rounded-lg border-none hover:bg-mgreen cursor-pointer ml-3 text-base font-medium transition-colors duration-300 whitespace-nowrap"
        >
          Добавить операцию
        </button>
      </div>
      {loading ? (
        <div className="text-white">Загрузка...</div>
      ) : (
          <div className="overflow-x-auto w-full rounded-lg">
            <table className="text-white border-separate border-spacing-2 w-full bg-mcgray max-w-full mx-auto table-fixed">
              <thead>
              <tr>
                <th className="p-1 text-center text-lg">Сумма</th>
                <th className="p-1 text-center text-lg">Категория</th>
                <th className="p-1 text-center text-lg">Дата</th>
                <th className="p-1 text-center text-lg w-10"></th>
              </tr>
              </thead>
              <tbody>
              {filteredOperations.map((operation) => (
                  <tr key={operation.id} className="hover:bg-mgray rounded-lg transition-colors duration-300">
                    <td className="p-1 flex justify-center items-center text-lg">
                      {operation.type === 'income' ? (
                          <FaArrowUp className="text-green-500 mr-1"/>
                      ) : (
                          <FaArrowDown className="text-red-500 mr-1"/>
                      )}
                      {operation.amount}₽
                    </td>
                    <td className="p-1 text-lg text-center">{operation.title}</td>
                    <td className="p-1 text-lg text-center">{new Date(operation.date).toLocaleDateString()}</td>
                    <td className="p-1 text-center">
                      <button
                          className="bg-inherit border-none rounded-lg focus:outline-none cursor-pointer"
                          onClick={() => handleDeleteOperation(operation.id)}
                      >
                        <FaTrashAlt className="text-red-600 w-5 h-5 hover:text-red-800"/>
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
      )}
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
