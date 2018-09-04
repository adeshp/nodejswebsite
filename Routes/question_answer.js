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
            var s = decodeURI(req.query.d);

            var return_value = {};
        
            var index = s.split("\n");
            var string_tobe_checked = index[1].trim();
            //return_value['string_tobe_checked'] = string_tobe_checked;
            var arr_s = index.slice(2, 6);

            //return_value['array'] = arr_s;
            // create the sort order

            var char_array = ['A', 'B', 'C', 'D'];

            var puzzle_array = {};
            var temp_array = {};

            //var ele = arr_s[1];

            //return_value['ele'] = ele;

            arr_s.forEach(function (ele)
            {
                for (var i = 1; i < ele.length; i++)
                {
                    if (ele[i] == '_' || ele[i] == '=') {
                        continue;
                    }
                   
                    var char = char_array[i-1]; // ege. A___<, means A < D
                    //return_value['i_ch'] = char;
                    //return_value['start_char'] = ele[0];
                    var start_char = ele[0];
                    switch (ele[i])
                    {
                        case '<':// start_char < char,
                            if (Object.keys(puzzle_array).length === 0) { // intial comparison so we can push
                                puzzle_array[start_char] = 0;
                                puzzle_array[char] = 1;
                                
                            } 
                            else {
                                // array conatins the elements so we need to check where we need to put those
                                // values

                                if (char in puzzle_array) { //exists then add them accordingly
                                    var temp = puzzle_array[char];
                                    puzzle_array[start_char] = temp - 1;
                                } else if (start_char in puzzle_array) {
                                    var temp = puzzle_array[start_char];
                                    puzzle_array[char] = temp + 1;
                                } else {
                                    //add them in temp array
                                    temp_array[start_char] = 0;
                                    temp_array[char] = 1;
                                }
                            }

                            break;
                        case '>':// start_char > char
                            if (Object.keys(puzzle_array).length === 0) { // intial compariosn so we can push
                                puzzle_array[char] = 0;
                                puzzle_array[start_char] = 1;
                                
                            }
                            else {
                                // array conatins the elements so we need to check where we need to put those
                                // values

                                if (start_char in puzzle_array) { //exists then add them accordingly
                                    var temp = puzzle_array[start_char];
                                    puzzle_array[char] = temp - 1;
                                } else if (char in puzzle_array) {
                                    var temp = puzzle_array[char];
                                    puzzle_array[start_char] = temp + 1;
                                } else {
                                    //add them in temp array
                                    temp_array[char] = 0;
                                    temp_array[start_char] = 1;
                                }
                                    
                            }
                            break;
                        default:
                            break;
                    }
                }
            });

            //return_value['before_merge'] = puzzle_array;

           // return_value['temp_obj'] = temp_array;

            if (Object.keys(temp_array).length === 0) {
                var temp_key = null;
                var temp_value = null;
                for (var t in temp_array) {
                    if (t in puzzle_array) {
                        temp_key = t;
                        temp_value = puzzle_array[t];
                        break;
                    }
                }

                // got the intersection of the two maps
                // compare their values

                for (var t in temp_array) {
                    if (temp_array[t] < temp_value) { // this char must be left of the temp in puzzel_array
                        var or_val = puzzle_array[temp_key];
                        puzzle_array[t] = or_val - 1;

                    } else if (temp_array[t] > temp_value) {
                        var or_val = puzzle_array[temp_key];
                        puzzle_array[t] = or_val + 1;
                    }
                }
            }

            // puzzle map is ready now, compare each string and fill the symbols

            //return_value['after_merge'] = puzzle_array;

            var result = []; result.push(" ".concat(string_tobe_checked));

            arr_s.forEach(function (ele) {
                var first_char_value = puzzle_array[ele[0]];
                
                var new_str = []; new_str.push(ele[0]);
                for (var j = 1; j < ele.length; j++){
             
                    if (ele[j] == '_' || ele[j] == '-') { // if it's not already evaluated
                        if (puzzle_array[string_tobe_checked[j - 1]] == first_char_value) {
                            c = '=';
                        } else if (first_char_value < puzzle_array[string_tobe_checked[j-1]]) {
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

            //return_value['result'] = result.join(" \n");

             res.send(result.join(" \n"));
            //res.send(JSON.stringify(result));

            //res.send(JSON.stringify(return_value));
   
        }
        else {
            res.send('Could not understand your query.');
        }
    } else {
        res.send('OK');
    }
    
    
});



module.exports = router;