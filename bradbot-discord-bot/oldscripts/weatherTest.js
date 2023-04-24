module.exports = (robot) => {
  
  robot.hear(/^\!weatherme/i, (res) => {
    getWeather(res);
  });
};

const Days = {'SUN': 'Sunday', 'MON': 'Monday', 'TUE': 'Tuesday', 
			'WED': 'Wednesday', 'THU': 'Thursday', 'FRI': 'Friday', 
			'SAT': 'Saturday', 'TONIGHT': 'Tonight', 'TODAY': 'Today'};
const Months = {'NOV': 'November', 'DEC': 'December', 'JAN': 'January', 'FEB': 'February'};

// Sleep Time
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
	console.log('Sleeping.. just a sec')
	await sleep(2000);
	console.log("Aight, I'm up")
}
//

function getWeather(res) {
  // Web scraping for weather
  const cheerio = require('cheerio');
  const request = require('request');
  
  request('https://weather.com/weather/5day/l/USOH0212:1:US', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const weatherHeader = [];
      //const weatherTitle = $('[class^=locations-title]').children('h1').text();
      //const timeStamp = $('[class^=observation-timestamp]').text();

      buildColumns(res, $, $('table.twc-table').find('th'), $('table.twc-table').find('tbody tr td'));
    } else {
      res.robot.logger.error("Something went wrong with the web call... mah bad")
    }
  })
}

function buildColumns (res, $, wCols, wRows) {
	const timeStamp = $('[class^=observation-timestamp]').text();
	const tempTitle = $('[class^=locations-title]').children('h1').text();
	var weatherColumns = [];
	
	wCols.each(function(i, elem) {
		weatherColumns[i] = $(this).text();
	})
	
	var weatherTitle = tempTitle + " -- " + timeStamp
	buildRows(res, $, weatherColumns, wRows, weatherTitle);
	
}

function buildRows (res, $, weatherColumns, wRows, weatherTitle) {
	var weatherRows = [];
	var weatherData = [];
	wRows.each(function(i, elem) {
		if (i == 1 || (i-1) % 7 == 0) {
			var titleTemp = String($(this).attr('title'));
			weatherData.push(titleTemp);
			console.log("Title --", titleTemp);
		}
	})
	findDate(res, $, wRows, weatherData, weatherTitle);
}

function findDate (res, $, wRows, weatherData, weatherTitle) {
	weekDays = [];
	weekDates = [];
	searchCount = 0;
	setTimeout(() => {
		wRows.each(function(i, elem) {
			var dataTemp = $(this).text()
			monthSearch = dataTemp.match(/(nov|dec|jan|feb|mar|apr|may|jun|jul|aug|sep|oct)/i);
			if (monthSearch && !(searchCount)) {
				month = Months[monthSearch[0].toUpperCase()];
				searchCount++;
			}
			
			daySearch = dataTemp.match(/(sun|mon|tue|wed|thu|fri|sat|today|tonight)(?!ny)/i);
			dateSearch = dataTemp.match(/\d{1,2}/i)
			if (daySearch && dateSearch ) {
				console.log("Data -- ", dataTemp);
				weekDays.push(Days[daySearch[0].toUpperCase()]);
				weekDates.push(dateSearch[0])
				console.log("Found weekday - " + Days[daySearch[0].toUpperCase()]);
				console.log("    Found the date - " + dateSearch[0]);
			}
		})
	}, 500)
	setTimeout (() => {
		sendWeather(res, weatherData, weekDays, weekDates, weatherTitle, month);
	}, 1000)
}

function sendWeather(res, weatherData, weekDays, weekDates, weatherTitle, month) {
	res.send(weatherTitle);
	weatherData.forEach((wData, index) => {
		res.send(`**${weekDays[index]},  ${month} ${weekDates[index]}**  \n   ${wData}`);
	})
}

/* Unused Code... RIP
 *
function weatherBody (i, elem) {
	titleTemp = String($(this).attr('title'))
	if ((i == 0 || i % 6 == 0) && (titleTemp.indexOf('undefined') === -1) {
		console.log(titleTemp + "    " + i);
		weatherInfo.push(titleTemp);
 *
 function getMonth ($, dataTemp) {
	Object.keys(Months).forEach(function(key) {
		var index = dataTemp.toUpperCase().indexOf(key);
		if (index != -1) {
			var month = Months[key];
			return month;
		} else {
			var month = "Bullshit";
			return month;
		}
	})
}

function getDay ($, dataTemp) {

	Object.keys(Days).forEach(function(dKey) {
		var index = dataTemp.toUpperCase().indexOf(dKey);
		if (index != -1) {
			var day = Days[dKey] + " " + dataTemp.substr(-1);
		}
	})
}
*/
//function sortWeather (weatherHeaders, weatherBody) 