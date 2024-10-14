const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req,res) => {
    const users = await mongodb.getDatabase().db().collection('users').find().toArray();
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(users);
};

const createContact = async(req,res) => {
    const user = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the user');
    }
};

module.exports = {
    getAll,
    createContact
};