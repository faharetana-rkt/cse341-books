const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/', booksController.getAll);
router.post('/', booksController.createBook);

module.exports = router;