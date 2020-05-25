const express = require('express');
const app = express();
const mongoose = require('mongoose');
const noteRoute = require('./route/noteRoute');
const PORT = 4000;
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
app.use(bodyParser.json())
app.use('/note', noteRoute)
app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}...`));
