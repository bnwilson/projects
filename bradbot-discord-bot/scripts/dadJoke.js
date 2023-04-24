module.exports = (robot) => {
  
  robot.hear(/^\!dadjoke/i, (res) => {
    getDadJoke(res);
  });
};

function getDadJoke(res) {
  // Web scraping for weather
  const cheerio = require('cheerio');
  const request = require('request');

  request('https://icanhazdadjoke.com', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
	  const temp = $('section.section').find('p');
	  // console.log(temp);
      const dadJoke = $('[class^=card-content]').children('p').text();
	  
	  findPunch(res, $, dadJoke);
	  }
  })
}

function findPunch(res, $, dadJoke) {
	var joke = dadJoke.split(/(?<=\?) /i);
	var punchline = false;
	var sleepTime = 200;
	
	if (dadJoke.match(/\?/i)) {
		sendMultiJoke(res, $, joke);
	}  else {
		sendJoke(res, $, dadJoke);
	}
}

function sendJoke(res, $, joke) {
	res.send(joke);
	// console.log(joke);
}

function sendMultiJoke(res, $, joke) {
	var timeout = 200;
	var punchline = false;
	joke.forEach((jline, index) => {
		setTimeout(() => {
			if (punchline) {
				res.send(`*${jline}*`)
				// console.log(` ** ${jline} **`)
				return
			}
			if (jline.match(/\?/i) && !(punchline)) {
				res.send(`${jline}`);
				// console.log(`${jline}`)
				var punchline = true;
				var timeout = 1000;
			} else {
				res.send(jline);
				// console.log(jline);
			}
		}, timeout)
	})
}