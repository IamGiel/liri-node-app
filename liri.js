// Node module imports needed to run the functions
	var fs = require("fs"); //reads and writes files
	var request = require("request");
	var keys = require("./keys.js");
	var twitter = require("twitter");
	var spotify = require ("spotify");
	var liriArgument = process.argv[2];
	

	//=================================================================
	// Possible commands for this liri app
	switch(liriArgument) {
		case "my-tweets": myTweets(); break;
		case "spotify-this-song": spotifyThisSong(); break;
		case "movie-this": movieThis(); break;
		case "do-what-it-says": doWhatItSays(); break;
		// Instructions displayed in terminal to the user
		default: console.log("=========== MY NAME IS LIRI, CHOOSE ONE OF OPTION COMMANDS BELOW: ==============" + 
			"\n OPTION: 1. my-tweets 'any twitter name' " +
			"\n OPTION: 2. spotify-this-song 'any song name' "+
			"\n OPTION: 3. movie-this 'any movie name' "+
			"\n OPTION: 4. do-what-it-says."+
			"\nBe sure to put the movie or song name in quotation marks if it's more than one word.");
	};

	//=================================================================
	// Movie function, uses the Request module to call the OMDB api
	function movieThis(){
		var movie = process.argv[3];
		if(!movie){
			movie = "mr nobody";
		}
		// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
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
				space + "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\n" + 
				"\nActors: ===> " + movieObject.Actors + "\n" +
				"\nPlot:  ===> " + movieObject.Plot + "\n" +
				"\n====== LIRI ====== LIRI ====== LIRI ====== LIRI====== LIRI ====== LIRI ======" + "\n" + "\n";
				
				console.log(movieResults);
				// console.log(movieObject);
			} else {
				console.log("Error :"+ error);
				return;
			}
		});
	};

	//=================================================================
	// Tweet function, uses the Twitter module to call the Twitter api
	function myTweets() { 
		var client = new twitter({
		  consumer_key: 'u5L64CZk3QLvKMfFJfkHoKVsY',
		  consumer_secret: 'JO25nuQDnCyYetIM1bfG01tU46z8yV9PG62ZLgHrmOfQ9oJvUV',
		  access_token_key: '937407163324162054-T02uzHa1i4fB5yJHK7VTzbOmzXFyKFI',
		  access_token_secret: '4jy5h7WipMyxdBYlAkqoIdRRFp6hjw5c34Zhn2uGrm6Du'
		});
		 
		var twitterUsername = process.argv[3];
		var text = "text";
		var params = {screen_name: twitterUsername, count: 20};
		if(!twitterUsername){
			twitterUsername = "LfaLeg";
		}
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	for (var i = 0; i < tweets.length; i++) {
		  		console.log(response.text);
		  		console.log(tweets.text);
		  		console.log(JSON.stringify(response.text, null, 2));

		  		// console.log(response.text);
		  		console.log("------------------------"+  i  +"---------------------------");
		  	}
		  	for (var i = 0; i < tweets.length; i++) {
		  		console.log(response.text);
		  		console.log(tweets.text);
		  		console.log(JSON.stringify(response.text, null, 2));

		  		// console.log(response.text);
		  		console.log("------------------------"+  i  +"---------------------------");
		  	}
		  }
		});	
	}

	//=================================================================
	// // Spotify function, uses the Spotify module to call the Spotify api
	// function spotifyThisSong(songName) {
	// 	var songName = process.argv[3];
	// 	if(!songName){
	// 		songName = "What's my age again";
	// 	}
	// 	params = songName;
	// 	spotify.search({ type: "track", query: params }, function(err, data) {
	// 		if(!err){
	// 			var songInfo = data.tracks.items;
	// 			for (var i = 0; i < 5; i++) {
	// 				if (songInfo[i] != undefined) {
	// 					var spotifyResults =
	// 					"Artist: " + songInfo[i].artists[0].name + "\r\n" +
	// 					"Song: " + songInfo[i].name + "\r\n" +
	// 					"Album the song is from: " + songInfo[i].album.name + "\r\n" +
	// 					"Preview Url: " + songInfo[i].preview_url + "\r\n" + 
	// 					"------------------------------ " + i + " ------------------------------" + "\r\n";
	// 					console.log(spotifyResults);
	// 					log(spotifyResults); // calling log function
	// 				}
	// 			}
	// 		}	else {
	// 			console.log("Error :"+ err);
	// 			return;
	// 		}
	// 	});
	// };
	// // Do What It Says function, uses the reads and writes module to access the random.txt file and do what's written in it
	// function doWhatItSays() {
	// 	fs.readFile("random.txt", "utf8", function(error, data){
	// 		if (!error) {
	// 			doWhatItSaysResults = data.split(",");
	// 			spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
	// 		} else {
	// 			console.log("Error occurred" + error);
	// 		}
	// 	});
	// };
	// // Do What It Says function, uses the reads and writes module to access the log.txt file and write everything that returns in terminal in the log.txt file
	// function log(logResults) {
	//   fs.appendFile("log.txt", logResults, (error) => {
	//     if(error) {
	//       throw error;
	//     }
	//   });
	// }