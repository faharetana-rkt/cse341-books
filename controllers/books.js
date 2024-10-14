const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req,res) => {
    //#swagger.tags=['Books']
    const books = await mongodb.getDatabase().db().collection('books').find().toArray();
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(books);
};

const createBook = async(req,res) => {
    //#swagger.tags=['Books']
    const book = {
        title: req.body.title,
        type: req.body.type,
        chapters: req.body.chapters,
        artist: req.body.artist,
        author: req.body.author,
        firstAired: req.body.firstAired,
        synopsis: req.body.synopsis
    };
    const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the book');
    }
};

module.exports = {
    getAll,
    createBook
};

