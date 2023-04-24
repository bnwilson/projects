module.exports = (robot) => {

	robot.hear(/^!Convert ([a-zA-Z]{3}) to ([a-zA-Z]{3})/i, (res) => {
		fromcurr = res.match[1]
		tocurr = res.match[2]
		convert(res, fromcurr, tocurr)
			.then((message) => {
				console.log(message)
			}).catch((error) => {
				console.log(error.message)
			})
	})
	robot.hear(/^!Convert to ([a-zA-Z]{3})/i, (res) => {
		fromcurr = res.match[1]
		tocurr = res.match[2]
		convert(res, fromcurr, tocurr)
			.then((message) => {
				// console.log(message)
			}).catch((error) => {
				console.log(error.message)
			})
	})
	robot.hear(/^!Convert ([a-zA-Z]{1, 2}|[a-zA-Z]{4, 10}) to ([a-zA-Z]{1, 2}|[a-zA-Z]{4, 10}) /i, (res) => {
		res.respond("You can only use 3-letter abbreviations of the currency.\n_ex. 'usd' to 'eur'_");
	});
}

// **********************************************************
// API Global Variables
// **********************************************************
var currencylayerkey = "97bcbac7ee2acc8c1011556f5e8119f2";
var currurl = "http://www.apilayer.net/api/live?access_key=" + currencylayerkey;
var resturl = "https://restcountries.eu/rest/v2/currency/";
const axios = require('axios');

// **********************************************************
// Functions
// **********************************************************
const getCurrencies = async (res, fromcurr, tocurr) => {
	try {
		const response = await axios.get(currurl + '&format=1');
		console.log(response)
		const rate = response.data.quotes
		const exchangeRate = rate[`${fromcurr}${tocurr}`]
		return exchangeRate
	} catch (error) {
		res.send("I'm sorry, " +
		"something went wrong trying to find the exchange rate " +
		"\n   Error code -- " + response.statusCode);
		throw new Error(error, 'Something went wrong, check the logs or something, I dunno, jesus')
	}
}

const getCountries = async (res, currencyCode) => {
	try {
		const response = await axios.get(resturl + `${currencyCode}`);
		console.log(response);
		return response.data.map(country => country.name);
	} catch (error) {
		res.send(error);
		console.log(response);
		throw new Error(`unable to get countries that use ${currencyCode}`);
	}
	
}

const convert = async (res, fromcurr, tocurr, amount=1) => {
	const exchangeRate = await getCurrencies(res, fromcurr, tocurr);
	const countries = await getCountries(res, tocurr);
	const convertedAmount = (amount * exchangeRate).toFixed(2);
	const result = `${amount} ${fromcurr} is worth ${convertedAmount} ${tocurr} ` + "\n" +
	"You can spend this in the following countries: \n" + countries;
	res.send(result);
	return result;
}


// First attempt stuff below
/*
function callCurrApi(res, currency) {
	// Hit Currency Exchange API
	//

	request(currurl, (error, response, html) => {
		if (!error && response.statusCode == 200) {
			findExchangeRate(res, currency, response.body);
		}
	} else {
		res.send("Sorry, something went wrong" + "\n" + response.statusCode)
	})
}

function findExchangeRate(res, currency) {

}
*/
