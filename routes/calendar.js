const { calendarEmitter } = require('../event');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    calendarEmitter.emit('callReadFile', res);
});

router.post('/', (req, res) => {
    let data = req.body;
    data.start_time = JSON.parse(data.start_time);
    data.end_time = JSON.parse(data.end_time);
    calendarEmitter.emit('callCreateFile', res, data);
});

router.put('/', (req, res) => {
    let data = req.body;
    data.start_time = JSON.parse(data.start_time);
    data.end_time = JSON.parse(data.end_time);
    calendarEmitter.emit('callEditFile', res, data);
});

module.exports = router;