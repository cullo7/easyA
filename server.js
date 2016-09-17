var express = require('express');
var fs = require('fs');
var app = express();
var querystring = require('querystring')
var rmp = require('rmp-api');
var bodyparser = require("body-parser");


/************* VARIABLES ****************/

var course = ""

//0 - 1 
var weight = {
	quality: .75,
  easiness: 1,
  help: 1,
  clarity: 1,
  topTag: .75,
  grade: 1,
	tag:.5,
	rating:1
}

var tags{
	"TEST HEAVY": 1.05,
	 "CLEAR GRADING CRITERIA":.95,
	 "TOUGH GRADER":1.1,
	 "RESPECTED":.95,
	 "LOTS OF HOMEWORK":1.1,
	 "LECTURE HEAVY": 1,
	 "GET READY TO READ": 1.05,
	 "CARING":.95,
	 "GIVES GOOD FEEDBACK":.95,
		"PARTICIPATION MATTERS":1,
		"SKIP CLASS? YOU WON'T PASS": 1.05,
	"BEWARE OF POP QUIZZES":1,
	"INSPIRATIONAL": 1,
	"ACCESSIBLE OUTSIDE OF CLASS":1,
	"SO MANY PAPERS": 1.05,
	"HILARIOUS":1,
	"GRADED BY FEW THINGS":1,
	"AMAZING LECTURES": 1,
	"EXTRA CREDIT": .95,
	"GROUP PROJECTS": 1
}

var postive = []

var negative = []


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

function parse_data(data){
	//quality: '2.9',
  //easiness: '3.1',
  //help: '3.1',
  //clarity: '3.1',
  //topTag: 'Tough Grader (9)',
  //grade: '3.1'
  //tags
  //comments
  //courses
  //course_ratings
	//16credits*3hours*15weeks
	var hours = 720
  if(data.courses.indexOf(course) < 0){
		return -1;
	}

	hours *= tags[data.topTag.toUpperCase()]*5
	hours *= ((5-parseInt(data.quality,10))/3)*weight.quality
	hours *= ((5-parseInt(data.easiness,10))/3)*weight.easiness
	hours *= ((5-parseInt(data.help,10))/3)*weight.help
	hours *= ((parseInt(data.clarity,10))/3*)*weight.clarity
	hours *= ((10-parseInt(data.grade,10))/5*)*weight.grade

	for(tag in data.tags){
		hours *= (tags[tag]*weight.tag)
	}

	for(rating in data.courseRatings){
		hours *= (ratings[rating]*weight.rating)
	}	

	for(comment in data.comments{
		hours *= (parseComment(comment)*weight.comment)
	)
}

function parseComments(comments){
	
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
