# MIXTAPE

Mixtape is a simple script that reads in two files (A mixtape and changes file) and outputs the updated mixtape JSON file.


## INPUT FILES

A sample of each file is located in the INPUT folder.

* mixtape.json - a JSON formated mixtape file with a list of users, playlist and songs. 
* changes.txt  - a pipe delimited changes file that specifies what changes you want to make to the mixtape file.


## CHANGES.TXT format

The changes.txt file is a pipe deliminted change list.  One change per line. Change actions are specified in the following format:

Change action tag|one or more change action items delimited by additional pipes.

Possible change actions

* ADD_PLAYLIST|<playlist Id>|<User Id>|<common seperated list of song Ids>
* DEL_PLAYLIST|<playlist Id>
* ADD_SONG|<playlist Id>|<song Id>


### Assumptions

The script does not do error handling nor does it verify the validity of the changes.txt format or playlist/song ids. It is up to the user to format the files and select valid ids. 

* When adding a playlist, it is assumed its Id is unique.  If the mixtape already has the specified Id, the existing playlist will be overwritten.
* When adding a playlist, the given user ID exists
* When adding a playlist, the given song Id exists
* Sort of a given, but the script only specify an existing playlist
* When adding a song to a playlist, the playlist and song already exists.  


## HOW IT WORKS

* download node.js for your environment. Downloads can be found at https://nodejs.org/en/download/\
* download the repo
* update the mixtape.json file and/or changes.txt file. samples are provided in the input folder
* open a cmd window and navigate the prompt to the base of the downloaded repo.
* type "node application/processMixtape
* the script will read in the mixtape.json and changes.txt file from the input directory and create an updated mixtape file called output.json in the output directory.


# HOW TO SCALE TO HANDLE LARGE MIXTAPE.JSON OR CHANGES.TXT FILES

The script was written to read fairly large mixtape.json data files into memory. The script will read the file and store the data into three different hashmaps for constant time lookup performance when processing the changes.txt file.  To limit the memory footprint, the change.txt was designed so it can be read line by line and make changes to the hashmaps in memory. Hence, it can already handle extremly large change files.  Last, the script just outputs the data from the hasmaps to an output file. 

If you have an extremely large mixtape file that cannot be read into memory on the local workstation/server, you'll need to write custom parsers to read the JSON file in chunks and then store the data off into large in-memory databases such as redis so you can process the changes.txt file.  Again, you'll need custom file parsers to write out the updated json data file.  

Enjoy.



