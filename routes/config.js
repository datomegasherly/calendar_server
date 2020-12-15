const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let date = new Date();
    res.json({date});
});

module.exports = router;