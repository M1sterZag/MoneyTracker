import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

        // Группируем операции по типу и названию
        const groupedIncome = groupOperations(response.data.filter(operation => operation.type === 'income'));
        const groupedExpense = groupOperations(response.data.filter(operation => operation.type === 'expense'));

        // Сортируем операции по сумме в обратном порядке
        const sortedIncome = sortOperations(groupedIncome);
        const sortedExpense = sortOperations(groupedExpense);

        // Вычисляем общую сумму доходов и расходов
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

  // Функция для вычисления общей суммы операций
  const calculateTotalAmount = (operations) => {
    return operations.reduce((total, operation) => total + operation.amount, 0);
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
      <div className="statistics text-white">
        <div className="total-income mb-4">
          <h3>Общая сумма доходов: {totalIncome}₽</h3>
        </div>
        <div className="total-expense mb-4">
          <h3>Общая сумма расходов: {totalExpense}₽</h3>
        </div>
      </div>
    </div>
  );
}

export default Home;
