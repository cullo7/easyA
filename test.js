<<<<<<< HEAD
var sys = require("sys");
sys.puts("Hello World");
=======
var rmp = require("rmp-api");
 
var callback = function(professor) {
  if (professor === null) {
    console.log("No professor found.");
    return;
  }
	console.log(professor)
};
 
rmp.get("Patrick Madden", callback);
>>>>>>> 24d169fd2635ec7828734ecb08149f4fce704436
