var express = require('express');
var fs = require('fs');
var app = express();
var querystring = require('querystring')
var rmp = require('rmp-api');
var bodyparser = require("body-parser");


/************* VARIABLES ****************/

var course = ""

/****************************************/


/************ FUNCTIONS ****************/

// Extracts string from inside next parenthesis it encounters
function paren(str){
  var p = false
    var new_str = ""
    for(var i = 0; i < str.length; i++){
      if (str[i] == '(')
        p = true
      else if (str[i] == ')')
        p = false
      else if (p)
        new_str+=str[i]
    }
  return new_str
}

function find_professor(name){
  professor = rmp.get(name, parse_data)
  if (professor === null) {
    console.log("No professor found.");
    return;
  }
  
};

function parse_data(professor){
  console.log(course);
  console.log(professor);
  
	/*console.log("Name: " + professor.fname + " " + professor.lname);
  console.log("University: "+ professor.university);
  console.log("Quality: " + professor.quality);
  console.log("Easiness: " + professor.easiness);
  console.log("Helpfulness: " + professor.help);
  console.log("Average Grade: " + professor.grade);
  console.log("Chili: " + professor.chili);
  console.log("URL: " + professor.url);
  console.log("First comment: " + professor.comments[0]);*/ 
}

/*****************************************************************************/

/********************************* main **************************************/

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/search', function(req, res){
  console.log(req.query)
  console.log(req.query.course)
  course = req.query.course
  find_professor(req.query.name)
})

app.use('/', function(req, res, next) {
  fs.readFile('index.html',function (err, data){
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    res.write(data);
    res.end();
  });
});

app.listen('8080'); 

/*****************************************************************************/
