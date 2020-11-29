const express = require('express');
const emitter = require('./event');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.get('/api/calendar', (req, res) => {
    emitter.emit('callReadFile', res);
});

app.post('/api/calendar', (req, res) => {
    let data = req.body;
    data.start_time = JSON.parse(data.start_time);
    data.end_time = JSON.parse(data.end_time);
    emitter.emit('callCreateFile', res, data);
});

app.listen(2020, () => {
    console.log('server is listening on port 2020');
});