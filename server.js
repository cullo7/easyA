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

var bareTags = [
  "TEST HEAVY",
  "CLEAR GRADING CRITERIA",
  "TOUGH GRADER",
  "RESPECTED",
  "LOTS OF HOMEWORK",
  "LECTURE HEAVY",
  "GET READY TO READ",
  "CARING",
  "GIVES GOOD FEEDBACK",
  "PARTICIPATION MATTERS",
  "SKIP CLASS? YOU WON'T PASS.",
  "BEWARE OF POP QUIZZES",
  "INSPIRATIONAL",
  "ACCESSIBLE OUTSIDE CLASS",
  "SO MANY PAPERS",
  "HILARIOUS",
  "GRADED BY FEW THINGS",
  "AMAZING LECTURES",
  "EXTRA CREDIT",
  "GROUP PROJECTS"
]

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
  "SKIP CLASS? YOU WON'T PASS.": 1.05,
  "BEWARE OF POP QUIZZES":1,
  "INSPIRATIONAL": 1,
  "ACCESSIBLE OUTSIDE CLASS":1,
  "SO MANY PAPERS": 1.05,
  "HILARIOUS":1,
  "GRADED BY FEW THINGS":1,
  "AMAZING LECTURES": 1,
  "EXTRA CREDIT": .95,
  "GROUP PROJECTS": 1
}

var tips = {
  "TEST HEAVY": "Prepare to study for a lot of tests",
  "CLEAR GRADING CRITERIA": "Adhere to outlined grading criteria",
  "TOUGH GRADER": "Follow assignment instructions closely",
  "RESPECTED":"Professor is Respected",
  "LOTS OF HOMEWORK": "Make a routine for doing homework regularly",
  "LECTURE HEAVY": "Lectures will be plentiful, takes notes",
  "GET READY TO READ": "Prepare for a lot textbook reading",
  "CARING": "Professor is Caring",
  "GIVES GOOD FEEDBACK":"You will receive a lot of feedback on work",
  "PARTICIPATION MATTERS": "Participate in class and discussions",
  "SKIP CLASS? YOU WON'T PASS.": "Do not skip class",
  "BEWARE OF POP QUIZZES":"Beware of pop quizzes",
  "INSPIRATIONAL": "Professor is Inspirational",
  "ACCESSIBLE OUTSIDE CLASS": "Professor is availablle outside of class",
  "SO MANY PAPERS": "There will be a lot of papers",
  "HILARIOUS":"Professor is Hilarious",
  "GRADED BY FEW THINGS":"Grades are based off very few assignments",
  "AMAZING LECTURES": "Lectures are amazing",
  "EXTRA CREDIT": "Extra Credit is offered",
  "GROUP PROJECTS": "There will be group projects"
}

var popular = {
  "TEST HEAVY": 0,
  "CLEAR GRADING CRITERIA":0,
  "TOUGH GRADER":0,
  "RESPECTED":0,
  "LOTS OF HOMEWORK":0,
  "LECTURE HEAVY": 0,
  "GET READY TO READ": 0,
  "CARING":0,
  "GIVES GOOD FEEDBACK":0,
  "PARTICIPATION MATTERS":0,
  "SKIP CLASS? YOU WON'T PASS.": 0,
  "BEWARE OF POP QUIZZES":0,
  "INSPIRATIONAL": 0,
  "ACCESSIBLE OUTSIDE CLASS":0,
  "SO MANY PAPERS": 0,
  "HILARIOUS":0,
  "GRADED BY FEW THINGS":0,
  "AMAZING LECTURES": 0,
  "EXTRA CREDIT": 0,
  "GROUP PROJECTS": 0
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

var description = ""

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
        negative.push(data);
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
  name = name.split(" ")
  name = name[0][0].toUpperCase()+name[0].substring(1).toLowerCase()+" "+name[1][0].toUpperCase()+name[1].substring(1).toLowerCase()

  for(var i = 0; i < course.length; i++){
		if (course[i] < '0' || course[i] > '9') {
      console.log(course[i])
    	course = course.substring(0, i)+course.charAt(i).toUpperCase()+course.substring(i+1)
		} 
  }

	console.log(course)

  if (name === null || course === null) {
    console.log("No professor found.");
    return
  }
  rmp.get(name, function(data) {
    cb(parseData(data, course));
  })
}

function parseData(data, course){
  var hours = 180
  if(data === null || data.courses.indexOf(course) < 0){
    return -1;
  }
  var powerTag = data.topTag.split('(')[0]
  powerTag = powerTag.substring(0,powerTag.length-1).toUpperCase()

  hours = applyWeight(hours, tags[powerTag], .25)
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

  data.tags.forEach(function(tag){
    console.log(tag)
    popular[tag]++
    /*if(tag.indexOf("'") > -1){
      tag = "SKIP CLASS? YOU WON'T PASS."
      console.log("changed "+ tags["SKIP CLASS? YOU WON'T PASS."])
    }*/
    console.log(tags[tag])
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
  })

  var indexArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]

  for(var i = 0; i < 19; i++){
    if(popular[bareTags[i]] > popular[bareTags[i+1]]){
      var temp = indexArray[i]
      indexArray[i] = indexArray[i+1]
      indexArray[i+1] = temp
    }
  }
  console.log("arr "+indexArray)

  for(var i = 0; i < 20; i++){
    console.log("pop "+popular[bareTags[indexArray[i]]])
  }

  for(var i = 17; i < 20; i++){
    console.log("# "+popular[bareTags[indexArray[i]]])
    description+="* "+tips[bareTags[indexArray[i]]]+"<br>"
  }

  console.log(hours)
  data.comments.forEach(function(comment){
    hours = applyWeight(hours, parseComment(comment), weight.comment)
    //console.log("hours "+hours)
  })

  //console.log(hours)
  return hours/15;
}

function parseComment(comment){
  var effect = 1.000;
    comment = removePeriods(comment)
    comment = removeCommonWords(comment.split(" "), common)
    comment.forEach(function(word){
      //console.log(word)
      //console.log(positive.indexOf("best"))
      if(positive.indexOf(word) > -1){
        //console.log("positive "+word)
        effect *= 1.01
      }
      else if(negative.indexOf(word) > -1){
        //console.log("negative "+word)
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
      if(data < 0 || description.length < 0){
        page = page.replace(/hour_result/g, "N/A")
        page = page.replace(/grade_result/g, "N/A")
        page = page.replace(/desc_result/g, "N/A")
        page = page.replace(/Results/g, "There are no results to your search")
      }
      else{
        page = page.replace(/hour_result/g, data.toFixed(2))
        page = page.replace(/grade_result/g, req.query.grade)
        page = page.replace(/desc_result/g, description )
      }
      res.write(page);
      res.end();
    })
  })
  description = []
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
