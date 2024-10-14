const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const mongodb = require('./data/database');

app.use(bodyParser.json());

app.use('/', require('./routes'));

(async () => {
    try {
        const db = await mongodb.initDb();         
        console.log('Database initialized and node running at port', port);
    } catch (err) {
        console.error('Error initializing database:', err);
    }
})();
