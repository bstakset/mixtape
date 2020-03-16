const readline = require('readline');
const fs = require('fs');

//reads changes file and updates mixtape. method is asynchronous since the node.js
//readline is event driven and requires a callback.  by reading the changes.txt file
//line by line we limit the memory foot print of the script. 
module.exports = function(changeFile, users, playlists, songs, callback) {

    console.log("\nupdate mixtape ...");
	
	const rl = readline.createInterface({
      input: fs.createReadStream(changeFile),
      output: process.stdout,
      terminal: false
    });
	
	rl.on('line', (line) => {
       let lineItems = line.split('|');
	   
	   //switch will only process three known commands, the rest
	   //will be ignored.
	   switch(lineItems[0]){
		  case 'ADD_PLAYLIST':
            let playlist = createPlaylist(lineItems[1], lineItems[2], lineItems[3]);
			playlists[playlist.id] = playlist;
			break;
			
          case 'DEL_PLAYLIST':
            delete playlists[lineItems[1]];
            break;
			
          case 'ADD_SONG':	
            let targetlist = playlists[lineItems[1]];
			
			//only add if playlist in map
			if(targetlist!=undefined) {
              targetlist.song_ids.push(lineItems[2]);			
		    }
	   }
    
	}).on('close', function() {
	   console.log('update complete ...');
       return callback();
	   
    });

};

//helper method to create a playlist object
function createPlaylist(playlistId, userId, songs){
	let playlist ={};
	
	playlist.id       = playlistId;
	playlist.user_id  = userId;
	playlist.song_ids = [];
	
	let songIds = songs.split(",");
	
	for(let i=0;i<songIds.length;i++){
	   playlist.song_ids.push(songIds[i]);
	}
	
	return playlist;
	
}