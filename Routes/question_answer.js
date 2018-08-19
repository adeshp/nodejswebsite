var express = require('express');
var router = express.Router();


router.get('/question_answer', function (req, res) {
    if (req.query.d) {
        if (req.query.d.includes('Please return OK')) {
            res.send('OK');
        } else {
            res.send('Could not understand your query.');
        }
    } else {
        res.send('OK');
    }
    
    
});



module.exports = router;