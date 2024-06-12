import React from 'react';

function AddOperation({ handleCancel, handleAddOperation, handleChange, newOperation }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-mcblack p-10 rounded-lg w-full max-w-md">
        <h2 className="text-mgreen text-center text-2xl mb-6">Добавить операцию</h2>
        <form onSubmit={handleAddOperation} className="w-full">
          <div className="mb-4">
            <input
              type="text"
              id="title"
              name="title"
              value={newOperation.title}
              onChange={handleChange}
              className="w-full box-border border-none p-3 rounded-lg bg-mcgray text-white border border-mcgray placeholder-white"
              placeholder="Название категории..."
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              id="amount"
              name="amount"
              value={newOperation.amount}
              onChange={handleChange}
              className="w-full box-border border-none p-3 rounded-lg bg-mcgray text-white border border-mcgray placeholder-white"
              placeholder="Цена..."
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              id="date"
              name="date"
              value={newOperation.date}
              onChange={handleChange}
              className="w-full box-border border-none p-3 rounded-lg bg-mcgray text-white border border-mcgray placeholder-white"
              required
            />
          </div>
          <div className="mb-4">
            <div className="flex">
              <label className="flex items-center mr-3 bg-mcgray p-2 pl-1 rounded-lg">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={newOperation.type === 'income'}
                  onChange={handleChange}
                  className=""
                  required
                />
                <span className="text-white">Приход</span>
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
                <span className="text-white">Расход</span>
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="border-none bg-mcgray text-white p-3 rounded-lg hover:bg-red-700"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="border-none bg-mcgray text-white p-3 rounded-lg hover:bg-mgreen"
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
