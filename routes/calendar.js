const { get, create, update, remove } = require('../dbEvent');
const express = require('express');
const router = express.Router();

router.get('/:year/:month', (req, res) => get(req, res));
router.get('/:year/:month/:startDay/:endDay', (req, res) => get(req, res));

router.post('/', (req, res) => create(req, res));
router.put('/', (req, res) => update(req, res));
router.delete('/:full/:id', (req, res) => remove(req, res));

module.exports = router;