var express = require('express');
var router = express.Router();
var myData = require('../data/portfolio.json');
var fs = require('fs');

router.get('/portfolio', function (req, res) {
    res.json(myData);
});
module.exports = router;