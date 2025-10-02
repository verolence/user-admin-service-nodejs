# user-admin-service-nodejs
Сервис управления пользователями на Node.js (Express, TypeScript, MongoDB).  
Поддерживает регистрацию, авторизацию, получение данных пользователей и блокировку.  
Реализованы проверки прав доступа (админ / пользователь) и авторизация через JWT.

## В проекте используются:
- Typescript - язык программирования с типизацией поверх JavaScript,
- Node.js - среда выполнения JavaScript на сервере,
- MongoDB - документная NoSQL СУБД, 
- Mongoose - библиотека для работы с СУБД в Node.js,
- Express - веб-фреймворк для создания серверных маршрутов и API,
- JWT - авторизация пользователей через токены

## Инструкция по запуску
1. Установить зависимости:
   ```bash
   npm install
   ```
2. Заполнить .env файл:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/user-admin-db
   JWT_SECRET=your_secret_key
   ```
3. Запустить сервер:
   ```bash
   npm run dev
   ```

## Эндпоинты
POST /api/auth/register — регистрация

POST /api/auth/login — авторизация, возвращает JWT

GET /api/users/:id — получить пользователя по id (админ или сам пользователь)

GET /api/users — список пользователей (только админ)

POST /api/users/:id/block — блокировка (админ или сам пользователь)

[Коллекция запросов для Postman](https://verolence-5547050.postman.co/workspace/Veronika-S's-Workspace~218175dc-8e10-4c2e-8053-9d6521598b26/collection/47225634-1102d5ad-e9fe-44b7-882e-a6db744f6951?action=share&creator=47225634)

## Пример запроса

### Создание пользователя
```
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "fullName": "Анастасия Иванова",
  "birthDate": "2003-04-04",
  "email": "anastacy@example.com",
  "password": "password123",
  "role": "user"
}'
```
```
Invoke-WebRequest -Uri http://localhost:3000/api/auth/register `
-Method POST `
-Headers @{ "Content-Type" = "application/json" } `
-Body '{ "fullName": "Анастасия Иванова", "birthDate": "2003-04-04", "email": "anastacy@example.com", "password": "password123", "role": "user" }'

```
