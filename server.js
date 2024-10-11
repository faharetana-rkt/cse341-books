const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const database = require('./data/database');

app.use(bodyParser.json());
