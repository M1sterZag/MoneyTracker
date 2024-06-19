# Используем официальный образ Python для сборки зависимостей
FROM python:3.11.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей в контейнер
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем оставшуюся часть кода
COPY . .

# Команда для запуска приложения (выполнение миграций с alembic и запуск uvicorn)
CMD ["sh", "-c", "alembic upgrade head && uvicorn main:app --host 0.0.0.0 --port 8000"]
