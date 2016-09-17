var express = require('express');
var app = express();
var querystring = require('querystring')
var rmp = require('rmp-api');

/************* VARIABLES ****************/


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

}

function parse_data(raw_data, course){
  
}

/*****************************************************************************/

/********************************* main **************************************/

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/search', function(req, res){
  var data = find_professor(req.query.name)
  console.log("finding prof: "+req.query.name)
  var desc = parse_data(data, req.query.course)
})

app.use('/', function(req, res, next) {
  fs.readFile('index.html',function (err, data){
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    res.write(data);
    res.end();
  });
});

app.listen('8081'); 

/*****************************************************************************/
