import React, { useState } from 'react';

function AddOperation({ handleCancel, handleAddOperation, handleChange, newOperation }) {
  const [amountError, setAmountError] = useState('');

  const handleAmountChange = (e) => {
    const value = e.target.value;
    handleChange(e);

    if (value < 0) {
      setAmountError('Сумма не может быть отрицательной');
    } else {
      setAmountError('');
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-mcblack p-10 rounded-lg w-full max-w-md">
        <h2 className="text-mgreen text-center text-3xl mb-6">Добавить операцию</h2>
        <form onSubmit={handleAddOperation} className="w-full">
          <div className="mb-4 focus-within:ring-2 focus-within:ring-mgreen rounded-lg">
            <input
              type="text"
              id="title"
              name="title"
              value={newOperation.title}
              onChange={handleChange}
              className="w-full box-border border-none p-3 rounded-lg bg-mcgray text-white text-lg border border-mcgray placeholder-white focus:outline-none"
              placeholder="Название категории..."
              required
            />
          </div>
          <div className="mb-4 focus-within:ring-2 focus-within:ring-mgreen rounded-lg">
            <input
              type="number"
              id="amount"
              name="amount"
              value={newOperation.amount}
              onChange={handleAmountChange}
              className="w-full box-border border-none p-3 rounded-lg bg-mcgray text-white text-lg border border-mcgray placeholder-white focus:outline-none"
              placeholder="Цена..."
              required
            />
            {amountError && <p className="text-red-600 mt-2">{amountError}</p>}
          </div>
          <div className="mb-4 focus-within:ring-2 focus-within:ring-mgreen rounded-lg">
            <input
              type="date"
              id="date"
              name="date"
              value={newOperation.date}
              onChange={handleChange}
              className="w-full box-border border-none p-3 rounded-lg bg-mcgray text-white text-lg border border-mcgray placeholder-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 flex justify-center">
            <div className="flex space-x-3">
              <label className="flex items-center bg-mcgray p-2 pl-1 rounded-lg">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={newOperation.type === 'income'}
                  onChange={handleChange}
                  className=""
                  required
                />
                <span className="text-white text-lg ml-1">Приход</span>
              </label>
              <label className="flex items-center bg-mcgray p-2 pl-1 rounded-lg">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={newOperation.type === 'expense'}
                  onChange={handleChange}
                  className=""
                  required
                />
                <span className="text-white text-lg ml-1">Расход</span>
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="border-none bg-mcgray text-white text-lg p-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="border-none bg-mcgray text-white text-lg p-4 rounded-lg hover:bg-mgreen transition-colors duration-300"
              disabled={amountError}
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddOperation;
