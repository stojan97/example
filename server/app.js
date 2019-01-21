const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const routes = require('./src/routing/router');
const auth = require('./src/filters/auth.filter');
const dbService = require('./src/services/db.service');

// Setup express app
const app = express();
const port = process.env.PORT || 8000;
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routing
app.all('/api/auth/*', (req, res, next) => auth(req, res, next));
app.use('/api', routes);

// Start Database service
const DB = dbService(false, true).start();

const server = http.createServer(app);
server.listen(port, () => {
    console.log('Server started on port: ' + port);
    return DB;
});

module.exports = app;