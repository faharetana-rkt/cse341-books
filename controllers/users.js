const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req,res) => {
    //#swagger.tags=['Users']
    try {
        const users = await mongodb.getDatabase().db().collection('users').find().toArray();
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(users);
    } catch(err) {
        console.error('Error fetching user: ' + err.message);
        res.status(500).json({message: "An error occured while fetching users."});
    }
};

const getSingle = async(req,res) => {
    //#swagger.tags=['Users']
    try{
        const contactId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('users').find( {_id:contactId} ).toArray();
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(users);
    }
    catch(err){
        console.error('Error fetching user: ' + err.message);
        res.status(500).json({message: "An error occured while fetching the user.", error: err.message});
    }
};

const createContact = async(req,res) => {
    //#swagger.tags=['Users']
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
    createContact,
    getSingle
};