const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const travelsRouter = require('./routes/travels');
const commentsRouter = require('./routes/comments');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/travels', travelsRouter(dbHelpers));
app.use('/api/comments', commentsRouter(dbHelpers));

module.exports = app;
