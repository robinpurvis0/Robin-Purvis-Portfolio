var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter1 = require('./routes/index');
var insRouter = require('./routes/insurance');
var ownerRouter = require('./routes/owner');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect to mongoose DB
const credentials = require("./dbCredentials.js");
const mongoose = require('mongoose');
mongoose.connect(credentials.connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/', indexRouter1);
app.use('/ins', insRouter);
app.use('/owner', ownerRouter);

app.get("*", async(req, res) => {
    res.status = 404;
    res.sendFile(__dirname + "/public/404.html");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;