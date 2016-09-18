var express = require('express');
var fs = require('fs');
var app = express();
var querystring = require('querystring')
var rmp = require('rmp-api');
var bodyparser = require("body-parser");
var csv = require("fast-csv");
var streampos = fs.createReadStream("positive.csv");
var streamneg = fs.createReadStream("negative.csv");
var common = require('common-words');




/************* VARIABLES ****************/

var course = ""

//0 - 1
var weight = {
  quality: .05,
  easiness: .25,
  help: .1,
  clarity: .1,
  topTag: .05,
  grade: .25,
  tag:.1,
  rating:.1,
  comment:0
}

var tags = {
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

var ratings = {
  'AWESOME':.95,
  'POOR':1.05,
  'GOOD':.99,
  'AVERAGE':1,
  'AWFUL':1.1
}

var positive = []

var negative = []


/****************************************/


/************ FUNCTIONS ****************/

var posCSVStream = csv()
    .on("data", function(data){
        positive.push(data);
    })
    .on("end", function(){
         console.log("done");
    });

streampos.pipe(posCSVStream);

//stream in words with negative connotation
var negCSVStream = csv()
    .on("data", function(data){
        negative.push;
    })
    .on("end", function(){
         console.log("done");
    });

streamneg.pipe(negCSVStream);

//remove common words
function removeCommonWords(words, common) {
  common.forEach(function(obj) {
    var word = obj.word;
    while (words.indexOf(word) !== -1) {
      words.splice(words.indexOf(word), 1);
    }
  });
  return words
};

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

function find_professor(name, course, cb){
  console.log(name)
  console.log(course)
  if (name === null) {
    console.log("No professor found.");
    return
  }
  rmp.get(name, function(data) {
    cb(parseData(data, course));
  })
}

function parseData(data, course){
  var hours = 180
  console.log(hours)
  if(data.courses.indexOf(course) < 0){
    return -1;
  }
  hours = applyWeight(hours, tags[data.topTag.split('(')[0].substring(0, 12).toUpperCase()], .25)
  console.log(hours)
  hours = applyWeight(hours, (5-parseInt(data.quality,10))/3, weight.quality)
  console.log(hours)
  hours = applyWeight(hours, (5-parseInt(data.easiness,10))/3, weight.easiness)
  console.log(hours)
  hours = applyWeight(hours, (5-parseInt(data.help,10))/3, weight.help)
  console.log(hours)
  hours = applyWeight(hours, (5-parseInt(data.clarity,10))/3, weight.clarity)
  console.log(hours)
  hours = applyWeight(hours, (10-parseInt(data.grade,10))/5, weight.grade)

  console.log(hours)
  data.tags.forEach(function(tag){
    hours = applyWeight(hours, tags[tag], weight.tag)
  })

  function applyWeight(total, grade, weight){
    var rest = total - (total*weight)
    var part = total*weight
    var newPart = part*grade
    return rest+newPart
  }

  console.log(hours)
  data.courseRatings.forEach(function(rating){
    hours = applyWeight(hours, ratings[rating], weight.rating)
    //console.log("hour"+hours+" rating "+rating)
  })
  
  console.log(hours)
  data.comments.forEach(function(comment){
    hours = applyWeight(hours, parseComment(comment), weight.comment)
    console.log("hours "+hours)
  })

  console.log(hours)
  // res.redirect('/results?hours='+hours)
  return hours/15;
}

function parseComment(comment){
  var effect = 1.000;
    comment = removePeriods(comment)
    comment = removeCommonWords(comment.split(" "), common)
    comment.forEach(function(word){
      if(positive.indexOf(word) > -1){
        console.log("positive "+word)
        effect *= 1.01
      }
      else if(negative.indexOf(word) > -1){
        console.log("negative "+word)
        effect *=.99
      }
    })
  return effect;
}

function removePeriods(sentence){
  var postSentence = ""
  for(var i = 0; i < sentence.length; i++){
    if(sentence[i] != '.' && sentence[i] != "!" && sentence[i] != ',' && i < sentence.length-1 && sentence.substring(i, i+2) !== ("  ")){
      postSentence+=sentence[i]
    }
  }
  return postSentence
}

/*****************************************************************************/

/********************************* main **************************************/

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/search', function(req, res){
  console.log(req.query.name+" "+req.query.course+" "+req.query.grade)
  find_professor(req.query.name, req.query.course, function(data) {
  fs.readFile('result.html','utf8', function (err, page){
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':page.length});
    page = page.replace(/hour_result/g, data)
    page = page.replace(/grade_result/g, req.query.grade)
    page = page.replace(/desc_result/g, "Insert description" )
    res.write(page);
    res.end();
  })
  })
})

app.use('/', function(req, res) {
  fs.readFile('index.html',function (err, data){
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    res.write(data);
    res.end();
  })
})

app.listen('8020');

/****************************************************************************/
