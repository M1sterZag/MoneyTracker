import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home({ token }) {
  const [incomeOperations, setIncomeOperations] = useState([]);
  const [expenseOperations, setExpenseOperations] = useState([]);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/operations/get', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Группируем операции по типу и названию
        const groupedIncome = groupOperations(response.data.filter(operation => operation.type === 'income'));
        const groupedExpense = groupOperations(response.data.filter(operation => operation.type === 'expense'));

        // Сортируем операции по сумме в обратном порядке
        const sortedIncome = sortOperations(groupedIncome);
        const sortedExpense = sortOperations(groupedExpense);

        setIncomeOperations(sortedIncome);
        setExpenseOperations(sortedExpense);
      } catch (error) {
        console.error('Ошибка получения операций пользователя:', error.response?.data?.detail || error.message);
      }
    };

    if (token) {
      fetchOperations();
    }
  }, [token]);

  // Функция для группировки операций по типу и названию
  const groupOperations = (operations) => {
    const grouped = {};
    operations.forEach(operation => {
      const key = `${operation.type}-${operation.title}`;
      if (grouped[key]) {
        grouped[key].amount += operation.amount;
      } else {
        grouped[key] = {
          ...operation,
          amount: operation.amount
        };
      }
    });
    return Object.values(grouped);
  };

  // Функция для сортировки операций по сумме в обратном порядке
  const sortOperations = (operations) => {
    return operations.sort((a, b) => b.amount - a.amount);
  };

  const renderTopOperations = (operations, title) => {
    return (
      <div className="categories mb-5">
        <h1 className="text-white mb-4">{title}</h1>
        {operations.length >= 3 ? (
          <div className="cards grid gap-x-2 grid-cols-3">
            {operations.slice(0, 3).map((operation, index) => (
              <div key={index} className="card text-white bg-mcblack p-5 rounded-lg">
                <h3>{operation.title}</h3>
                <h3>Сумма: {operation.amount}₽</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">Пожалуйста, добавьте минимум 3 операции {title === 'Топ 3 самых прибыльных категорий' ? 'прихода' : 'расхода'}</p>
        )}
      </div>
    );
  };

  return (
    <div className='bg-mcgray rounded-lg p-5'>
      {renderTopOperations(expenseOperations, 'Топ 3 самых затратных категорий')}
      {renderTopOperations(incomeOperations, 'Топ 3 самых прибыльных категорий')}
      <div className="diagram text-white">
        <div className="head flex justify-between items-center w-full mb-5">
          <h3>Операции по периодам</h3>
          <div className="p-2 pt-2 pb-2 bg-mcblack rounded-lg">
            <h3 className='m-0 cursor-pointer'>За неделю</h3>
          </div>
        </div>
        <div className="diagram-image bg-mcblack rounded-lg">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Home;
