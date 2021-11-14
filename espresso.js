/**
 * EspressoJS - Hippie's Fav Server Plate
 * Powered by Vimedev.com Labs
 * ----------------
 * Express Plug & Play Server
 * -----------------
 * @param {*} app - EspressoJS by Vimedev.com Labs
 */

const express = require('express');
const app = express();
const cfg = require('./server');
require("dotenv").config(); 

const _path = require('path'),
    _cors = require('cors'),
    _compr = require('compression'),
    _favicon = require('serve-favicon');

const _static = require('serve-static'),
    _port = process.env.PORT || cfg.port,
    index = require('./server/routes/index');

const mongoose = require('mongoose');

if(cfg.mongo_isEnabled == true){
    let hasPort, hasUri;
    if(cfg.mongo.port == ''){
        hasPort = '/'
    } else {
        hasPort = ':' + cfg.mongo.port + '/'
    }
    if(cfg.mongo.uri == ''){
        hasUri = process.env.MONGO_URI;
    } else {
        hasUri = cfg.mongo.uri
    }

    const url = `mongodb+srv://${hasUri + hasPort + cfg.mongo.db}`;
    mongoose.Promise = global.Promise;
    mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            promiseLibrary: require('bluebird')
        })
        .then(() => console.log(':: DB Connection succesful ::'))
        .catch((err) => console.error(err));
}

app.use(_compr());
app.use(_cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(_favicon(_path.join(__dirname, 'public', 'favicon.ico')));
app.use(_static(_path.join(__dirname, 'public'), {
    maxAge: '1d',
    setHeaders: setCustomCacheControl,
    etag: true,
    extensions: 'error.html'
}));

function setCustomCacheControl(res, path) {
    if (_static.mime.lookup(path) === 'text/html') {
        res.setHeader('Cache-Control', 'public, max-age=0')
    }
}

index(app);
app.listen(_port);
module.exports = app;