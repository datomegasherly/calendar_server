const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let date = new Date();
    let category = [{label: 1, value: 'work'}, {label: 2, value: 'exercise'}];
    res.json({date, category});
});

module.exports = router;