# Запуск
- Обычно
   1. npm install
   2. Создать и заполнить файл .env
   3. npm start
- Docker
   1. *Запустить Mongo
   2. docker build -t advertisement .
   3. docker run -d -p 3000:3000 advertisement
- Docker-compose
   1. docker-compose up
# Функционал
## Api
- Регистрация
  1. POST /api/signup
  ```json
  {
      "email": "123",
      "password": "asd",
      "name": "Alex Kulagin",
      "contactPhone": "+7 123 456 78 90"
  }
  ```
- Аутентификация
  1. POST /api/signin
  ```json
  {
    "email": "name@name.com",
    "password": "password"
  }
  ```
- Просмотр объявлений
  1. GET /api/advertisements
  2. GET /api/advertisements/:id
- Управление объявлениями
  1. POST /api/advertisements
  ```json
  {
    "shotrTitle": "text",
    "description": "text",
    "images": [/* image, ... */]
  }
  ```
  2. DELETE /api/advertisements/:id
## Socket.io
- Сообщения приходящие в socket:
  1. getHistory - получить историю сообщений из чата;
  2. sendMessage - отправить сообщение пользователю.
- События отправляемые через socket:
  1. newMessage - отправлено новое сообщение;
  2. chatHistory - ответ на событие getHistory.