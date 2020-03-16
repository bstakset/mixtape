//-----------------------------------------------------------------------
// Name: updateMixtape
//
// Overview:
// This script reads a mixtape data from a file, a list of changes,
// and then outputs the updated mixtape file for further processing
//
// Input(files should be located in the input folder):
// 1 - mixtape.json, mix tape to update
// 2 - changes.txt, changes to apply to the mix tape
//     file format is a pipe deliminted file with three actions:
//     a. ADD_PLAYLIST - takes playlist Id, user id, and comma delimited list of song ids.
//     b. DEL_PLAYLIST - takes playlist id
//     c. ADD_SONG     - takes the playlist Id and song Id
//
//     ex. 
//     ADD_PLAYLIST|4|2|1,4,7
//     DEL_PLAYLIST|2
//     ADD_SONG|3|1
//
//
// Output(file will be written to the output folder):
// 1 - updated mixtap file, output.json
//
//-----------------------------------------------------------------------
let loadMixtape    = require('./loadMixtape.js');
let changeMixtape  = require('./changeMixtape.js');
let publishMixtape = require('./publishMixtape.js');

console.log('\nprocessing changes to your mixtape.\n');

//1 - define input and output files
let inputFile  = './input/mixtape.json';
let changeFile = './input/changes.txt';
let outputFile = './output/output.json';


//2 - create three hashmaps to store users, playlists and songs from the mixtape.
let users     = {};
let playlists = {};
let songs     = {};


//3 - load mixtape file into memory to make changes.
loadMixtape(inputFile, users, playlists, songs);


//4 - process change file to make changes to maps, method is asychronous so it 
//read the changes file line by line to limit the memory foot print.  
changeMixtape(changeFile, users, playlists, songs, function(){
	
  //5 - publish updated mixtape
  publishMixtape(outputFile, users, playlists, songs);

  //6 - done
  console.log('\ndone. get ready for some great tunes ...\n');
 	
});

