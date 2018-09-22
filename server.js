// server.js
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to db' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error:' + err);
});


const app = express();
const mobile_apps_api = require('./routes/mobile_apps_api');
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());

app.use('/api/', mobile_apps_api);
app.get('/', (req, res) =>res.send('Invalid Enpoint'));

app.listen(port);

app.listen(port, () =>console.log(`Server Started on port ${port}`));   