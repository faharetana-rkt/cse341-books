const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Book Api',
        description: 'It is an Api that performs CRUD operation on two collection in mongodb'
    },
    host: 'localhost:8080',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

