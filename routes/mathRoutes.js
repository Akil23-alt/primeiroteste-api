const express = require('express');
const router = express.Router();

const validateNumbers = require('../middlewares/validateNumbers');
const mathController = require('../controllers/mathController')

router.post('/', validateNumbers, mathController.calculateStats);

module.exports = router;