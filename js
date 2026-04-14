// server.js (Пример бэкенда на Node.js)
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Подключение к базе данных SQLite
const db = new sqlite3.Database('./collegeDB.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('Подключено к базе данных collegeDB.');
});

// Создание таблицы для хранения запросов пользователей
db.run(`CREATE TABLE IF NOT EXISTS UserQueries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    date_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Папка, где лежит ваш HTML файл

// Обработка отправки формы
app.post('/submit-query', (req, res) => {
    const { name, email, message } = req.body;
    
    const query = `INSERT INTO UserQueries (name, email, message) VALUES (?, ?, ?)`;
    db.run(query, [name, email, message], function(err) {
        if (err) {
            return res.status(500).send("Ошибка при сохранении в базу данных");
        }
        res.send("<h1>Спасибо! Ваш запрос успешно сохранен в базе данных.</h1><a href='/'>Вернуться назад</a>");
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
