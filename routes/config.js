const { calendarEmitter } = require('../event');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    calendarEmitter.emit('callConfig', res);
});

module.exports = router;