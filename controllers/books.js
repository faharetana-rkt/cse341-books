const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req,res) => {
    //#swagger.tags=['Books']
    const books = await mongodb.getDatabase().db().collection('books').find().toArray();
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(books);
};

const getSingle = async(req,res) => {
    //#swagger.tags=['Books']
    try{
        const bookId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('books').find( {_id:bookId} ).toArray();
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(response);
    }
    catch(err){
        console.error('Error fetching book: ' + err.message);
        res.status(500).json({message: "An error occured while fetching the book.", error: err.message});
    }
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

const updateBook = async(req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        type: req.body.type,
        chapters: req.body.chapters,
        artist: req.body.artist,
        author: req.body.author,
        firstAired: req.body.firstAired,
        synopsis: req.body.synopsis
    };
    const response = await mongodb.getDatabase().db().collection('books').replaceOne( { _id: bookId }, book );
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the book.');
    }
};

const deleteBook = async(req, res) => {
    //#swagger.tags=['Books']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500)(response.error || 'Somme error occured while deleting the book.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
};

