var rmp = require("rmp-api");
 
var callback = function(professor) {
  if (professor === null) {
    console.log("No professor found.");
    return;
  }
	console.log(professor)
};
 
rmp.get("Leslie Lander", callback);
