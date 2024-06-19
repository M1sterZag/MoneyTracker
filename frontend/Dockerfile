# Используем официальный образ Node.js
FROM node:16-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Указываем команду для запуска сервера разработки Vite
CMD ["npm", "run", "dev"]
