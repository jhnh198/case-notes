import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('../node_modules/tinymce/tinymce.js', 'public')));

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join('../node_modules/tinymce/tinymce.js', 'node_modules', 'tinymce')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;