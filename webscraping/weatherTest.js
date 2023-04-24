module.exports = (robot) => {
  
  robot.hear(/^\!weatherme/i, (res) => {
    getWeather(res);
  });
};


function getWeather(res) {
  // Web scraping for weather
  const cheerio = require('cheerio');
  const request = require('request');
  var indexCount = 0;
  
  request('https://weather.com/weather/5day/l/USOH0212:1:US', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const weatherInfo = [];
      const weatherHeader = [];
      const weatherTitle = $('[class^=locations-title]').children('h1').text();
      const timeStamp = $('[class^=observation-timestamp]').text();


      var weatherInfo = weatherTable($('table.twc-table').find('th'), $('table.twc-table').find('tbody tr td'));
    }  
    else {
      res.robot.logger.error = "Something went wrong with the web call... mah bad"
    }
  });

function weatherTable (res, wCols, wRows) {
	var weatherColumns = [];
	var weatherRows = [];
	
	wCols.each(function (i, elem) {
		weatherColumns[i] = $(this).text();
	});
	
	wRows.each(function (i, elem) {
		titleTemp = String($(this).attr('title'))
		if ((i == 0 || i % 6 == 0) && (titleTemp.indexOf('undefined')) === -1) {
			console.log(titleTemp + "    " + i);
			weatherRows.push(titleTemp);
			res.send(titleTemp);
    }
  })
}

}

/*
function weatherBody (i, elem) {
	titleTemp = String($(this).attr('title'))
	if ((i == 0 || i % 6 == 0) && (titleTemp.indexOf('undefined') === -1) {
		console.log(titleTemp + "    " + i);
		weatherInfo.push(titleTemp);
*/
//function sortWeather (weatherHeaders, weatherBody) {
	