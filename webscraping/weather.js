const cheerio = require('cheerio');
const request = require('request');

request('https://weather.com/weather/5day/l/USOH0212:1:US', (error, response, html) => {
	if (!error && response.statusCode == 200) {
		const $ = cheerio.load(html);
		const weatherHeader = [];
		const weatherDays = [];
		const weatherInfo = [];

		const weatherTitle = $('[class^=locations-title]').children('h1').text();
		const timeStamp = $('[class^=observation-timestamp]').text();

		// Get Column Names
		$('table.twc-table').find('th').each(function(i, elem) {
			weatherHeader[i] = $(this).text();
		});

		weatherHeader.join(', ');

		// Get Table Body Rows
		i = 0;
		x = 0;
		$('table.twc-table').find('tbody tr td').each(function(i, elem) {
			titleTemp = String($(this).attr('title'))
			if ((i == 0 || i % 6 == 0) && titleTemp.indexOf('undefined') === -1){
				console.log(titleTemp);
				x = x + 1;
			};
			weatherInfo[i] = $(this).text();
			
			
		});

		weatherInfo.join(', ');
		console.log(weatherInfo)

		// Get Table Day Rows
		$('table.twc-table').find('tbody tr td[classname=twc-sticky-col]').each(function(i, elem) {
			weatherDays[i] = $(this).text();
		});

		weatherDays.join(', ');



		console.log(weatherTitle);
		console.log(timeStamp);
		
		console.log("Weather Table Titles: \n"+weatherHeader+"\n\nWeather Days: \n"+weatherDays+"\n\n"+weatherInfo);
		/*
		const tableTest = []
		console.log("\n\n"+$('table.twc-table').each(function(i, elem) {
			tableTest[i] = $(this).text();
		}));
		*/
	}
	else {
		console.log("Didn't work");
		console.log("Might need to try something else");
	};
});


