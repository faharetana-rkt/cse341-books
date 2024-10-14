const express = require('express');
const router = express.Router();
const usersController = require('../controllers/books');

router.get('/', usersController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', usersController.createBook);
router.put('/:id', booksControllers.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;