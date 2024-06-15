import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

function Graphics({ token }) {
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/operations/get', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const operations = response.data;

        // Преобразование данных для линейного графика
        const transformedMonthlyData = operations.reduce((acc, operation) => {
          const month = new Date(operation.date).toLocaleString('default', { month: 'short' });
          const existing = acc.find(item => item.month === month);
          if (existing) {
            if (operation.type === 'income') {
              existing.income += operation.amount;
            } else {
              existing.expense += operation.amount;
            }
          } else {
            acc.push({
              month,
              income: operation.type === 'income' ? operation.amount : 0,
              expense: operation.type === 'expense' ? operation.amount : 0,
            });
          }
          return acc;
        }, []);

        // Преобразование данных для столбчатой диаграммы
        const totalIncome = operations
          .filter(op => op.type === 'income')
          .reduce((sum, op) => sum + op.amount, 0);

        const totalExpense = operations
          .filter(op => op.type === 'expense')
          .reduce((sum, op) => sum + op.amount, 0);

        const transformedTotalData = [
          {
            name: 'Всего',
            income: totalIncome,
            expense: totalExpense,
          },
        ];

        // Группировка операций по названию и типу
        const groupByTitle = (ops, type) => {
          return ops
            .filter(op => op.type === type)
            .reduce((acc, operation) => {
              const existing = acc.find(item => item.name === operation.title);
              if (existing) {
                existing.value += operation.amount;
              } else {
                acc.push({ name: operation.title, value: operation.amount });
              }
              return acc;
            }, []);
        };

        const groupedIncomeData = groupByTitle(operations, 'income');
        const groupedExpenseData = groupByTitle(operations, 'expense');

        // Сортировка данных по значению и выбор топ-10
        const transformedIncomeData = groupedIncomeData
          .sort((a, b) => b.value - a.value)
          .slice(0, 10);

        const transformedExpenseData = groupedExpenseData
          .sort((a, b) => b.value - a.value)
          .slice(0, 10);

        setMonthlyData(transformedMonthlyData);
        setTotalData(transformedTotalData);
        setIncomeData(transformedIncomeData);
        setExpenseData(transformedExpenseData);
      } catch (error) {
        console.error('Ошибка получения операций пользователя:', error.response?.data?.detail || error.message);
      }
    };

    if (token) {
      fetchOperations();
    }
  }, [token]);

  return (
    <div className="w-full p-6 bg-mcgray rounded-lg">
      <div className="mb-5">
        <div className="bg-mcblack p-4 rounded-lg shadow-lg">
          <h3 className="text-2xl text-center text-white mb-4">Доходы и расходы по месяцам</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
            >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="month"/>
              <YAxis/>
              <Tooltip/>
              <Legend
                payload={[
                  { value: 'Доходы', type: 'line', id: 'income', color: '#6CB54A' },
                  { value: 'Расходы', type: 'line', id: 'expense', color: '#FF0303' },
                ]}
              />
              <Line type="monotone" dataKey="income" stroke="#6CB54A"/>
              <Line type="monotone" dataKey="expense" stroke="#FF0303"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-5">
        <div className="bg-mcblack p-4 rounded-lg shadow-lg">
          <h3 className="text-2xl text-center text-white mb-4">Общие доходы и расходы</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={totalData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
            >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Legend verticalAlign="bottom" align="center"
                payload={[
                  { value: 'Доходы', type: 'bar', id: 'income', color: '#6CB54A' },
                  { value: 'Расходы', type: 'bar', id: 'expense', color: '#FF0303' },
                ]}
              />
              <Bar dataKey="income" fill="#6CB54A"/>
              <Bar dataKey="expense" fill="#FF0303"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4">
          <div className="bg-mcblack rounded-lg shadow-lg">
            <h3 className="text-2xl text-center text-white">Топ категорий доходов</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={incomeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#6CB54A"
                     label>
                  {incomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                  ))}
                </Pie>
                <Legend layout="vertical" verticalAlign="middle" align="right"/>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full md:w-1/2 px-4">
          <div className="bg-mcblack rounded-lg shadow-lg">
            <h3 className="text-2xl text-center text-white">Топ категорий расходов</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}
                     fill="#FF0303" label>
                  {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                  ))}
                </Pie>
                <Legend layout="vertical" verticalAlign="middle" align="right"/>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graphics;
