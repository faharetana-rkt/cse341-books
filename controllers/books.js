const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().alphanum().min(3).max(30).required(),
    type: Joi.string().min(5).max(6).required(),
    chapters: Joi.number().integer().min(0).required(),
    artist: Joi.string().min(2).max(30).required(),
    author: Joi.string().min(2).max(30).required(),
    date: Joi.string().min(10).max(10).required(),
    synopsis: Joi.string().min(5).max(1000).required(),
});

const idSchema = Joi.string().custom((value, helpers) => {
    if (!ObjectId.isValid(value)) {
        return helpers.message('Invalid ObjectId');
    }
    return value; // Keep the valid ObjectId
}, 'ObjectId Validation');


const getAll = async(req,res) => {
    //#swagger.tags=['Books']
    const { error, value } = querySchema.validate(req.query);
        
        if (error) {
            return res.status(400).json({ message: `Invalid request: ${error.details[0].message}` });
        }

        // Build the MongoDB query object based on validated parameters
        let query = {};
        if (value.title) {
            query.title = value.title;
        }
        if (value.type) {
            query.type = value.type;
        }
        if (value.chapters) {
            query.chapters = value.chapters;
        }
        if (value.artist) {
            query.artist = value.artist;
        }
        if (value.author) {
            query.author = value.author;
        }
        if (value.date) {
            query.date = value.date;
        }
        if (value.synopsis) {
            query.synopsis = value.synopsis;
        }

    const books = await mongodb.getDatabase().db().collection('books').find(query).toArray();
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(books);
};

const getSingle = async(req,res) => {
    //#swagger.tags=['Books']
    try{
        const { error } = idSchema.validate(req.params.id);
        if (error) {
            return res.status(400).json({ message: `Invalid request: ${error.details[0].message}` });
        }

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

    const { error, value } = bookSchema.validate(req.body);
    if (error) {
        // If validation fails, send 400 Bad Request
        return res.status(400).json({ message: `Invalid request: ${error.details[0].message}` });
    }
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

    const { error, value } = bookSchema.validate(req.body);
    if (error) {
        // If validation fails, send 400 Bad Request
        return res.status(400).json({ message: `Invalid request: ${error.details[0].message}` });
    }
    
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
    const { error } = idSchema.validate(req.params.id);
    if (error) {
        return res.status(400).json({ message: `Invalid request: ${error.details[0].message}` });
    }

    const bookId = new ObjectId(req.params.id);
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

