import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import axios from 'axios';

const ActivityCalendar = ({ token }) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/operations/get', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        const dates = data.reduce((acc, operation) => {
          const date = operation.date.split('T')[0];  // Извлекаем только дату
          const found = acc.find(item => item.date === date);
          if (found) {
            found.count += 1;  // Увеличиваем количество операций в этот день
          } else {
            acc.push({ date, count: 1 });
          }
          return acc;
        }, []);
        setValues(dates);
      } catch (error) {
        console.error('Ошибка получения операций пользователя:', error.response?.data?.detail || error.message);
      }
    };

    if (token) {
      fetchOperations();
    }
  }, [token]);

  return (
    <div className="bg-mcblack p-5 rounded-lg shadow-lg mt-8">
      <h2 className="text-white text-2xl font-semibold mb-4 text-center">Календарь активности</h2>
      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        values={values}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return 'color-empty';
          }
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
        showWeekdayLabels
      />
    </div>
  );
};

export default ActivityCalendar;
