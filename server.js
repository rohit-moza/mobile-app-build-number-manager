// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();

const mongoURL = 'mongodb://localhost/mobile-app-manager';
mongoose.connect(mongoURL);

app.use(express.static('public'));

router.get('/', (request, response) => {
    response.status(200).send({message: 'Hello World!'})
});

app.use(router);
const port = 8080;
app.listen(port);
console.log(`Server is running on port: ${port}`);