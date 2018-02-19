  
##   ** LIRI**
  
  LIRI is a Language Interpretation and Recognition Interface.
  
* LIRI will be a command line node app that takes in parameters and gives you back data.
* LIRI is ran via terminal.
* A log.txt is provided to see data results
* NOTE: to use this app, you need your own `twitter API keys` and store it in a file called `keys.js`

<table>
  <tr>
    <th>Liri Commands</th>
    <th>Retrieved Data</th>
    <th>API</th>
  </tr>
  <tr>
    <td>my-tweets</td>
    <td>retrieves last 20 tweets of the user</td>
    <td>TWITTER</td>
  </tr>
  <tr>
    <td>spotify-this-song</td>
    <td>Song details</td>
    <td>SPOTIFY</td>
  </tr>
  <tr>
    <td>movie-this</td>
    <td>Movie info</td>
    <td>OMDB</td>
  </tr>
  <tr>
    <td>do-what-it-says</td>
    <td>Random inputs</td>
    <td>local</td>
  </tr>
  </table>

## Heres a Snapshot
<hr>
Twitter API
<hr>

![TWITTER](https://github.com/IamGiel/liri-node-app/blob/master/images/my-tweets.png?raw=true)

<hr>
OMDB API
<hr>

![OMDB](https://github.com/IamGiel/liri-node-app/blob/master/images/spotify-this-song.png?raw=true)

## A log.txt is provided to display all data pulled by LIRI

![logs](https://github.com/IamGiel/liri-node-app/blob/master/images/logs.png?raw=true)

<br>

Here are the packages I used: 
       
        var fs = require("fs"); //reads and writes files
	    var request = require("request");
	    var keys = require("./keys.js");
	    var twitter = require("twitter");
	    var Spotify = require('node-spotify-api');


