var express = require('express');
var router = express.Router();
var myData = require('../data/myInfo.json');
var fs = require('fs');

router.get('/infoapi', function (req, res) {
    res.json(myData);
});
module.exports = router;