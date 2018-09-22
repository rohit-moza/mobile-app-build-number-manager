// server.js
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const mobile_apps_api = require('./routes/mobile_apps_api');
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use('/api/', mobile_apps_api);
app.get('/', (req, res) =>res.send('Invalid Enpoint'));

app.listen(port);

app.listen(port, () =>console.log(`Server Started on port ${port}`)); 
// const router = express.Router();

// const mongoURL = 'mongodb://localhost/mobile-app-manager';
// mongoose.connect(mongoURL);

// app.use(express.static('public'));

// router.get('/', (request, response) => {
//     response.status(200).send({message: 'Hello World!'})
// });

// app.use(router);

