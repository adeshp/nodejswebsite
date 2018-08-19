var express = require('express');
var router = express.Router();


router.get('/question_answer', function (req, res) {
    if (req.query.d) {
        if (req.query.d.includes('Please return OK')) {
            res.send('OK');
        }
        else if (req.query.d.includes('full name')) {
            res.send('Akshay Deshpande');
        } else if (req.query.d.includes('email address')) {
            res.send('akshaytanoor@gmail.com');
        } else if (req.query.d.includes('phone numbe')) {
            res.send('3126478558');
        } else if (req.query.d.includes('position are you applying for')) {
            res.send('software development engineering');
        } else if (req.query.d.includes('experience do you have')) {
            res.send('3 years');
        } else if (req.query.d.includes('hear about this position')) {
            res.send('LinkedIn');
        } else if (req.query.d.includes('university degree')) {
            res.send('Masters in Computer science');
        } else if (req.query.d.includes('download your resume and cover letter')) {
            res.send('I can email it you.');
        } else if (req.query.d.includes('source code of your resume')) {
            res.send('https://github.com/adeshp/nodejswebsite. This is my own project to which I added an endpoint "question_answer" for this test.');
        } else if (req.query.d.includes('eligibility to work in the US')) {
            res.send('Yes. I am on F-1 OPT Extension and able to work till Feb 2020. My H1-B with my current employer is being processed.');
        } else if (req.query.d.includes('solve this puzzle')) {
            var index = req.query.d.split(': ');
            var puzzle_solved_string = "ADBC"; // for record purpose
            var arr_s = index[1].split(" ");
            var string_tobe_checked = arr_s[0];
            arr_s.shift();
            //res.send(JSON.stringify(arr));
            //return;
            var arr_map = {};
            arr_map['A'] = 1;
            arr_map['B'] = 2;
            arr_map['C'] = 3;
            arr_map['D'] = 4;


            var result = []; result.push(string_tobe_checked);

            arr_s.forEach(function (ele) {
                var first_char_value = arr_map[ele[0]];
                //res.send(JSON.stringify(first_char_valu(ele) );
                //return;
                var new_str = []; new_str.push(ele[0]);
                for (var j = 1; j < ele.length; j++){
                    //res.send(JSON.stringify(ele+arr_map[string_tobe_checked[j-1]]));
                    if (ele[j] == '_' || ele[j] == '-') { // if it's not already evaluated
                        var c = ele[j];
                        if (arr_map[string_tobe_checked[j-1]] == first_char_value) {
                            c = '=';
                        } else if (first_char_value < arr_map[string_tobe_checked[j-1]]) {
                            c = '<';
                        } else {
                            c = '>';
                        }
                        new_str.push(c);

                    } else {
                        new_str.push(ele[j]);
                    }
                }

                var word = new_str.join("");


                result.push(word);
                
            });
            res.send(result.join(" "));
   
        }
        else {
            res.send('Could not understand your query.');
        }
    } else {
        res.send('OK');
    }
    
    
});



module.exports = router;