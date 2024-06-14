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
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

function Graphics({ token }) {
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [bubbleData, setBubbleData] = useState([]);

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
            name: 'Total',
            income: totalIncome,
            expense: totalExpense,
          },
        ];

        // Преобразование данных для круговых диаграмм
        const transformedIncomeData = operations
          .filter(op => op.type === 'income')
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 10)
          .map(op => ({ name: op.title, value: op.amount }));

        const transformedExpenseData = operations
          .filter(op => op.type === 'expense')
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 10)
          .map(op => ({ name: op.title, value: op.amount }));

        // Преобразование данных для Bubble Chart
        const transformedBubbleData = operations.map(op => ({
          name: op.title,
          x: new Date(op.date).getTime(),
          y: op.type === 'income' ? 1 : -1,
          z: op.amount,
        }));

        setMonthlyData(transformedMonthlyData);
        setTotalData(transformedTotalData);
        setIncomeData(transformedIncomeData);
        setExpenseData(transformedExpenseData);
        setBubbleData(transformedBubbleData);
      } catch (error) {
        console.error('Ошибка получения операций пользователя:', error.response?.data?.detail || error.message);
      }
    };

    if (token) {
      fetchOperations();
    }
  }, [token]);

  return (
    <div className="w-full">
      <div style={{ width: '100%', height: '400px' }}>
        <h3 className="text-center text-white mb-4">Monthly Income and Expense</h3>
        <ResponsiveContainer>
          <LineChart
            data={monthlyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#6CB54A" />
            <Line type="monotone" dataKey="expense" stroke="#FF0303" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '100%', height: '400px', marginTop: '40px' }}>
        <h3 className="text-center text-white mb-4">Total Income vs Expense</h3>
        <ResponsiveContainer>
          <BarChart
            data={totalData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#6CB54A" />
            <Bar dataKey="expense" fill="#FF0303" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
        <div style={{ width: '45%', height: '400px' }}>
          <h3 className="text-center text-white mb-4">Top 10 Income Categories</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={incomeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#6CB54A" label>
                {incomeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend layout="vertical" verticalAlign="middle" align="right" />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: '45%', height: '400px' }}>
          <h3 className="text-center text-white mb-4">Top 10 Expense Categories</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#FF0303" label>
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend layout="vertical" verticalAlign="middle" align="right" />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Graphics;
