const express = require('express');
const router = express.Router();
const usersController = require('../controllers/books');

router.get('/', usersController.getAll);
router.post('/', usersController.createBook);

module.exports = router;