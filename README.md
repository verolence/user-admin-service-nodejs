# user-admin-service-nodejs
Сервис работы с пользователями. 

## В проекте используются:
Typescript - язык программирования с типизацией поверх JavaScript,
Node.js - реда выполнения JavaScript на сервере,
MongoDB - документная NoSQL СУБД, 
Mongoose - библиотека для удобной работы с СУБД в Node.js,
Express — веб-фреймворк для создания серверных маршрутов и API,
JWT (jsonwebtoken) — для авторизации пользователей через токены

## Примеры запросов

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

### Логин пользователя (авторизация)
