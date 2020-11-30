const emitter = require('../event');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    emitter.emit('callReadFile', res);
});

router.post('/', (req, res) => {
    let data = req.body;
    data.start_time = JSON.parse(data.start_time);
    data.end_time = JSON.parse(data.end_time);
    emitter.emit('callCreateFile', res, data);
});

module.exports = router;