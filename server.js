// берём Express
var express = require('express');

// создаём Express-приложение
var app = express();

app.use(express.static('client'));
// создаём маршрут для главной страницы
// http://localhost:8080/
app.get('/|/station|/market|/field/{id}', function(req, res) {
  res.sendFile( __dirname + '/client/index.html');
});
// запускаем сервер на порту 8080
app.listen(3030);
// отправляем сообщение
console.log('Сервер стартовал!');