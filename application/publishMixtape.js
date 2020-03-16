'use strict';
const fs = require('fs');

//writes new mixtape to output file. uses a helper method to limit the loading of 
//all three maps into a new object before writing the JSON object to the file. Instead,
//it writes each map one at a time.
module.exports = function(outputFile, users, playlists, songs) {

    console.log("\npublish new mixtape ...");
	
	fs.writeFileSync(outputFile,       '{');     //clears file, if present and writes outside '{'
	writeArray(outputFile,'users',     users);
	fs.appendFileSync(outputFile,      ',');
	writeArray(outputFile,'playlists', playlists);
	fs.appendFileSync(outputFile,      ',');
	writeArray(outputFile,'songs',     songs);
	fs.appendFileSync(outputFile,      '}');

};


//helper function that takes map and converts it to an array for output
function writeArray(outputFile, name, map) {
  
  let myArray = Object.values(map);
  fs.appendFileSync(outputFile, '"'+name+'":'); 
  fs.appendFileSync(outputFile, JSON.stringify(myArray)); 
  
}








//OPTION 2: this option requires you to load the hashmaps into a new object
//before writing to a file.  Might be an issue for large data sets.

//'use strict';
//const fs = require('fs');
//module.exports = function(outputFile, users, playlists, songs) {
//
//    console.log("Hello from publishMixtape.js");
//	
//	let mixtape = {};
//	mixtape.users     = createArray(users);
//	mixtape.playlists = createArray(playlists);
//	mixtape.songs     = createArray(songs);
//	
//    fs.writeFileSync(outputFile, JSON.stringify(mixtape));
//	
//
//};
//
//
////helper function that takes map and converts it to an array for output
//function createArray(map) {
//	
//  return Object.values(map);
// 
//}