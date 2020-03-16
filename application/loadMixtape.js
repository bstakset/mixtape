'use strict';
const fs = require('fs');

//read the mixtape from the file and load the users, playlists and songs hashmaps.
//This way, the main program can look up the data items with O(1) performance when
//looping through the change file. 
module.exports = function(mixtapeFile, users, playlists, songs) {
  console.log("running loadMixtape ... ");
  
  let rawdata = fs.readFileSync(mixtapeFile);
  let mixtape = JSON.parse(rawdata);
  
  loadMap(mixtape.users,     users);
  loadMap(mixtape.playlists, playlists);
  loadMap(mixtape.songs,     songs);
  
};

//helper function to load the hashmap
function loadMap(myArray,myMap) {
  console.log('loading map ...');
  
  for(let i=0;i<myArray.length;i++){
	 let item = myArray[i];
	 myMap[item.id] = item; 
  }
  
}	