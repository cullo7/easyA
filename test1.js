var request = require('request');
request('https://classes.cornell.edu/api/2.0/search/classes.json?roster=FA14&subject=PHIL&acadCareer[]=GR&classLevels[]=6000', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var json = JSON.parse(body)
    for(var i = 0; i < json.data.classes.length; i++){
      console.log(json.data.classes[i])
      //console.log("description"+json.data.classes[i].description)
    }
  }
})
