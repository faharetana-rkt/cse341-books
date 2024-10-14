const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDb = async () => {
    if (database) {
        console.log('Db is already initialized');
        return database;
    }
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        database = client;
        return database;
    } catch (err) {
        throw new Error('Database initialization failed: ' + err.message);
    }
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
}