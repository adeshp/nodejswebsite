var express = require('express');
var router = express.Router();


router.get('/question_answer', function (req, res) {
    if (req.query.d.includes('Please return OK')) {
        res.send('ok');
    } else {
        res.send('Could not understand your query.');
    }
    
});



module.exports = router;