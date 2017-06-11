var express = require('express');
var router = express.Router();
var parser = require('body-parser');
var feedbackData = require('../data/feedback.json');
var fs = require('fs');

router.get('/api', function (req, res) {
    res.json(feedbackData);
});

router.use(parser.json());
router.use(parser.urlencoded({ extended : false }));

router.post('/api', function (req, res) {
    feedbackData.unshift(req.body);
    fs.writeFile('../data/feedback.json', JSON.stringify(feedbackData), 'utf8', function (err) { 
        console.log(err);
    });
    res.json(feedbackData);

});
module.exports = router;