import React, { useState } from 'react';
import AddOperation from './AddOperation';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';

function Operations() {
  const [showForm, setShowForm] = useState(false);

  const handleAddOperation = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="text-white flex flex-col items-center">
      <div className="flex justify-between items-center bg-mcgray p-3 rounded-lg mb-3 w-full box-border focus-within:ring-2 focus-within:ring-mgreen">
        <input 
          type="text" 
          id='search' 
          placeholder='Конкретная операция...' 
          className="bg-mcgray text-white border-none placeholder-white focus:outline-none"
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">1000₽</td>
              <td className="p-2">Еда</td>
              <td className="p-2">2024-05-25</td>
              <td className="p-2">
                <button className="bg-mcgray border-none rounded-lg focus:outline-none cursor-pointer">
                  <FaTrashAlt className="text-red-600 w-5 h-5 hover:text-red-800" />
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-2">1000₽</td>
              <td className="p-2">Еда</td>
              <td className="p-2">2024-05-25</td>
              <td className="p-2">
                <button className="bg-mcgray border-none rounded-lg focus:outline-none cursor-pointer">
                  <FaTrashAlt className="text-red-600 w-5 h-5 hover:text-red-800" />
                </button>
              </td>
            </tr>
            {/* Дополнительные строки операций */}
          </tbody>
        </table>
      </div>
      <div className="">
        <button 
          onClick={handleAddOperation} 
          className="bg-mcgray text-white p-3 rounded-lg border-none hover:bg-mgreen"
        >
          Добавить операцию
        </button>
      </div>

      {showForm && <AddOperation handleCancel={handleCancel} />}
    </div>
  );
}

export default Operations;
