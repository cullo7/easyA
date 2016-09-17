var csv = require("fast-csv");
var fs = require('fs')
var stream = fs.createReadStream("test.csv");
 
var csvStream = csv()
    .on("data", function(data){
         console.log(data);
    })
    .on("end", function(){
         console.log("done");
    });
 
stream.pipe(csvStream);
