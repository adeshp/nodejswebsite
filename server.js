﻿var express = require('express');
var app = express();
var winston = require('winston'),
    expressWinston = require('express-winston');



app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ],
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));



var infoFile = require('./data/myInfo.json');
app.set('port', process.env.PORT || 80);
app.set('appData', infoFile);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public/'));
app.use(require('./routes/index'));
app.use(require('./routes/feedback'));
app.use(require('./routes/api'));
app.use(require('./routes/infoapi'));
app.use(require('./routes/about'));
app.use(require('./routes/tweets'));
app.use(require('./routes/portfolio'));
app.use(require('./routes/question_answer'));

var tendoServer = app.listen(app.get('port'), function () {
    console.log('Listening on ' + app.get('port'));
});
