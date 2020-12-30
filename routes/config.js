const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let date = new Date();
    let category = [
        {label: 1, value: 'work'},
        {label: 2, value: 'exercise'}
    ];
    let status = [
        {label: 1, value: 'not started'},
        {label: 2, value: 'on stack'},
        {label: 4, value: 'in progress'},
        {label: 3, value: 'completed'}
    ];
    res.json({date, category, status});
});

module.exports = router;