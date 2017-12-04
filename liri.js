// Node module imports needed to run the functions
	var fs = require("fs"); //reads and writes files
	var request = require("request");
	var keys = require("./keys.js");
	var twitter = require("twitter");
	var spotify = require ("spotify");
	var liriArgument = process.argv[2];
// ---------------------------------------------------------------------------------------------------------------
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
// ---------------------------------------------------------------------------------------------------------------
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
	// Tweet function, uses the Twitter module to call the Twitter api
	function myTweets() {
		var client = new twitter({
			//Add here!
			oauth: {
				twitter: {
				consumer_key: "u5L64CZk3QLvKMfFJfkHoKVsY", // REQUIRED
				consumer_secret: "JO25nuQDnCyYetIM1bfG01tU46z8yV9PG62ZLgHrmOfQ9oJvUV" // REQUIRED
				}
			}

		});
		// var client = new twitter({
		// 	consumer_key: keys.twitterKeys.consumer_key,
		// 	consumer_secret: keys.twitterKeys.consumer_secret,
		// 	access_token_key: keys.twitterKeys.access_token_key,
		// 	access_token_secret: keys.twitterKeys.access_token_secret, 
		// });
		
		var twitterUsername = process.argv[3];
		if(!twitterUsername){
			twitterUsername = "LfaLeg";
		}
		params = {screen_name: twitterUsername};
		client.get("statuses/user_timeline/", params, function(error, data, response){
			if (!error) {
				for(var i = 0; i < data.length; i++) {
					console.log(response); // Show the full response in the terminal
					var twitterResults = 
					"@" + data[i].user.screen_name + ": " + 
					data[i].text + "\n" + 
					data[i].created_at + "\n" + 
					"------------------------------ " + i + " ------------------------------" + "\r\n";
					console.log(twitterResults);
					log(twitterResults); // calling log function
				}
			}  else {
				console.log("Error :"+ error);
				return;
			}
		});
	}
	