const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/v1')

const app = express();

// set security HTTP headers


// parse json request body
app.use(express.json());
// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
// v1 api routes
app.use(routes);

module.exports = app;
