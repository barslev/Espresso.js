/**
 * EspressoJS
 * ----------------
 * Express Plug & Play Server
 * -----------------
 * @param {*} app - EspressoJS by Vimedev.com Labs
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const _dbConfig = require('./config/database.config');
const _port = require('./config/port.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(_dbConfig.url, {
        useNewUrlParser: true,
        promiseLibrary: require('bluebird')
    })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

/**
 * Express GZIP Compression
 */
const compression = require('compression');
app.use(compression());

/**
 * Express CORS : ENABLED
 */
app.use(cors());

/*
 * Express Body-Parser
 */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*
 * Express Body-Parser
 */
const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

/*
 * Express Port's Configuration
 */
const port = process.env.PORT || _port.number;

/*
 * Express Read Static Folders
 */
const serveStatic = require('serve-static');

app.use(serveStatic(path.join(__dirname, 'public'), {
    maxAge: '1d',
    setHeaders: setCustomCacheControl,
    etag: true,
    extensions: 'error.html'
}))

function setCustomCacheControl(res, path) {
    if (serveStatic.mime.lookup(path) === 'text/html') {
        res.setHeader('Cache-Control', 'public, max-age=0')
    }
}

/*
 * Express Dynamic Routing
 */

const index = require('./routes/index');
app.use('/', index);

require('./routes/db/client.js')(app);
require('./config/logs.config.js')(app);

const api = require('./routes/db/api');
app.use('/api', api);

app.listen(port);

/*
 * Express Catch 404
 */

app.use((req, res, next) => {
    let err = new Error('404 - Not Found');
    err.status = 404;
    next(err);
})
module.exports = app;