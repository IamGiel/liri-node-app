// Node module imports needed to run the functions
	var fs = require("fs"); //reads and writes files
	var request = require("request");
	var keys = require("./keys.js");
	var twitter = require("twitter");
	var Spotify = require('node-spotify-api');
	var liriArgument = process.argv[2];
	var userINPUT = process.argv[3];
	
	
	//=================================================================
	// Possible commands for this liri app
	
	switch(liriArgument) {
		case "my-tweets": myTweets(); break;
		case "spotify-this-song": spotifyThisSong(); break;
		case "movie-this": movieThis(); break;
		case "do-what-it-says": doWhatItSays(); break;
		// Instructions displayed in terminal to the user
		default: console.log("=========== MY NAME IS LIRI, CHOOSE ONE OF OPTION COMMANDS BELOW: ==============\n" + 
			"\n OPTION: 1. my-tweets 'any twitter name' " +
			"\n OPTION: 2. spotify-this-song 'any song name' "+
			"\n OPTION: 3. movie-this 'any movie name' "+
			"\n OPTION: 4. do-what-it-says."+ "\n\n" +
			"\n**********\nBe sure to put the movie or song name in quotation \nmarks if it's more than one word.\n**********\n\n\n");
	}
	
	//=================================================================
	// Movie function, OMDB api
	function movieThis(){
		var movie = userINPUT;
		if(!movie){
			movie = "mr nobody";
		}
		movieName = movie
		request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var movieObject = JSON.parse(body);
				var space = "\n" + "\n" +"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
				//console.log(movieObject); // Show the text in the terminal
				var movieResults = " ===================== LIRI PROVIDED THIS DATA FOR YOU...====================\n" + 
				space + "Title: " + movieObject.Title + 
				space + "Year: " + movieObject.Year + 
				space + "Imdb Rating: " + movieObject.imdbRating+ 
				space + "Country: " + movieObject.Country + 
				space + "Language: " + movieObject.Language +
				space + "Rotten Tomatoes Rating: " + movieObject.tomatoRating + 
				space + "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\n\n\n" + 
				space + "***[MORE INFO BELOW]*** \n\n\n" + 
				"\nActors: ===> " + movieObject.Actors + "\n" +
				"\nPlot:  ===> " + movieObject.Plot + "\n" +
				"\n====== LIRI ====== LIRI ====== LIRI ====== LIRI====== LIRI ====== LIRI ======" + "\n" + "\n";
				
				console.log(movieResults);
				fs.appendFile("log.txt", movieResults, function (error) {
				  if (error) throw error;
				  console.log("saved!");
				});
				// console.log(movieObject);
			} else {
				console.log("Error :"+ error);
				return;
			}
		});
	};

	//=================================================================
	// Tweet function, Twitter api
	function myTweets() { 
		var client = new twitter({
		  consumer_key: 'u5L64CZk3QLvKMfFJfkHoKVsY',
		  consumer_secret: 'JO25nuQDnCyYetIM1bfG01tU46z8yV9PG62ZLgHrmOfQ9oJvUV',
		  access_token_key: '937407163324162054-T02uzHa1i4fB5yJHK7VTzbOmzXFyKFI',
		  access_token_secret: '4jy5h7WipMyxdBYlAkqoIdRRFp6hjw5c34Zhn2uGrm6Du'
		});
		 
		var twitterUsername = userINPUT;
		var text = "text";
		var params = {screen_name: twitterUsername, count: 20};
		if(!twitterUsername){
			twitterUsername = "LfaLeg";
		}
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	
		  	var divider = " ================= LIRI GOT YOU " + twitterUsername.toUpperCase() +  "'S LAST 20 TWEETS...================\n\n";
		  	console.log(divider);
		  	for (var i = 1; i < tweets.length; i++) {
		  		var time = tweets[i].created_at;
		  		var timeArr = time.split(' ');
		  		var output = "~~~~~~~~~~~~~~~~~~~~~ Tweet # "+  i  + " ~~~~~~~~~~~~~~~~~~~~~\n" + 
		  		tweets[i].text + "\n" +
		  		timeArr.slice(0,4).join('- ') + "\n\n\n";
		  		
		  		console.log(output);
		  		fs.appendFile("log.txt", divider + "\n" + output, function (error) {
		  		  if (error) throw error;
		  		  // console.log('Saved! check log.txt :)');
		  		});		  		
		  	}
		  	console.log('Saved! check log.txt :)');	
		  }
		  console.log(error);
		});	
	}

	// =================================================================
	// Spotify function, Spotify api
	function spotifyThisSong() {
		var spotify = new Spotify({
			id: '27a8864ac89a46a0b05ff38922f61f58',
			secret: '6396ce8169954f6c9edf68c72af394ab'
		});
		var songName = userINPUT;
		var space = "\n" + "\n" +"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
		if(!songName){
			SongName = "What's my age again";
		}

		params = songName;
		spotify.search({ type: 'track', query: params }, function(err, data) {
			if ( err ) {
			    console.log('Error occurred: ' + err);
			    return;  
			}
			else{
				output = space + "================= LIRI FOUND THIS FOR YOU...==================" + 
				space + "Song Name: " + "'" +songName.toUpperCase()+ "'" +
				space + "Album Name: " + data.tracks.items[0].album.name +
				space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +	
				space + "URL: " + data.tracks.items[0].album.external_urls.spotify + "\n\n\n";
				console.log(output);
					
					fs.appendFile("log.txt", output, function (err) {
					  if (err) throw err;
					  console.log('Saved!');
					});		
				};
		});
		  
	}
	// =================================================================
	// doWhatItSays function, fs Node Package
	var array_this = [];
	function doWhatItSays() {
		
		fs.readFile("random.txt", 'utf8' ,function(error, data) {
			if (error) throw error;
			// a = data.split(',');
			loggedTxt = data.split(',');
			console.log(loggedTxt);

			var command;
			var parameter;

			command = loggedTxt[0];
			parameter = loggedTxt[1];

			parameter = parameter.replace('"', '');
			parameter = parameter.replace('"', '');
			// console.log(parameter);

			switch (command) {
			   case 'my-tweets':
			       userINPUT = parameter;
			       myTweets();
			       break;

			   case 'spotify-this-song':
			       userINPUT = parameter;
			       spotifyThisSong();
			       break;

			   case 'movie-this':
			       userINPUT = parameter;
			       movieThis();
			       break;
			}
		});

	}





	