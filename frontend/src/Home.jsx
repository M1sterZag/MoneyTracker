import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActivityCalendar from "./ActivityCalendar.jsx";

function Home({ token }) {
  const [incomeOperations, setIncomeOperations] = useState([]);
  const [expenseOperations, setExpenseOperations] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/operations/get', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const groupedIncome = groupOperations(response.data.filter(operation => operation.type === 'income'));
        const groupedExpense = groupOperations(response.data.filter(operation => operation.type === 'expense'));

        const sortedIncome = sortOperations(groupedIncome);
        const sortedExpense = sortOperations(groupedExpense);

        const totalIncomeAmount = calculateTotalAmount(groupedIncome);
        const totalExpenseAmount = calculateTotalAmount(groupedExpense);

        setIncomeOperations(sortedIncome);
        setExpenseOperations(sortedExpense);
        setTotalIncome(totalIncomeAmount);
        setTotalExpense(totalExpenseAmount);
      } catch (error) {
        console.error('Ошибка получения операций пользователя:', error.response?.data?.detail || error.message);
      }
    };

    if (token) {
      fetchOperations();
    }
  }, [token]);

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

  const sortOperations = (operations) => {
    return operations.sort((a, b) => b.amount - a.amount);
  };

  const calculateTotalAmount = (operations) => {
    return operations.reduce((total, operation) => total + operation.amount, 0);
  };

  const renderTopOperations = (operations, title) => {
    return (
      <div className="categories mb-5">
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">{title}</h2>
        {operations.length >= 3 ? (
          <div className="cards grid gap-4 grid-cols-1 md:grid-cols-3">
            {operations.slice(0, 3).map((operation, index) => (
              <div key={index} className="card text-white bg-mcblack p-5 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-semibold">{operation.title}</h3>
                <p className="mt-2 text-lg">Сумма: <span className="font-bold">{operation.amount}₽</span></p>
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
    <div className='bg-mcgray rounded-lg p-8 w-full'>
      {renderTopOperations(expenseOperations, 'Топ 3 самых затратных категорий')}
      {renderTopOperations(incomeOperations, 'Топ 3 самых прибыльных категорий')}
      <div className="statistics text-white my-5 flex justify-between">
        <div className="total-income p-4 bg-mcblack rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 flex-1">
          <h3 className="text-xl font-semibold">Общая сумма доходов: <span className="font-bold">{totalIncome}₽</span></h3>
        </div>
        <div className="total-expense p-4 bg-mcblack rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 flex-1 ml-4">
          <h3 className="text-xl font-semibold">Общая сумма расходов: <span className="font-bold">{totalExpense}₽</span></h3>
        </div>
      </div>
      <ActivityCalendar token={token} />
    </div>
  );
}

export default Home;
