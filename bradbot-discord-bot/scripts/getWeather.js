module.exports = (robot) => {
    robot.hear(/^!weather(?:me|) (.+)/i, res => {
        let locationArg = res.match[1];
        if (locationArg.match(/[0-9]{4,5}/g)) {
            let location = locationArg;
            yahooWeather(res, API_ID, API_KEY, API_SECRET, location);
        } else if (locationArg.match(/.+,( |).+/i)) {
            let location = locationArg.replace(" ", "");
            yahooWeather(res, API_ID, API_KEY, API_SECRET, location);
        } else {
            res.reply("WTF is _" + locationArg + "_?? I need a 5-digit zip, or '_city,state_'!\n ex. _!weatherme columbus,oh_");
        }
    })
    
    robot.hear(/^!weatherme$/i, res => {
        res.reply("Gonna have to tell me a location - 5-digit zip, or _city,state_\n ex. _!weatherme columbus,oh_");
    })
}

/************* Global Variables **********************************************/
const API_ID = process.env.HUBOT_YAHOO_APPID;
const API_KEY = process.env.HUBOT_YAHOO_CLIENT_ID;
const API_SECRET = process.env.HUBOT_YAHOO_CLIENT_SECRET;
/*****************************************************************************/

/************* Call Yahoo Weather API and parse response *********************/
const yahooWeather = async (res, appId, apiKey, apiSecret, location) => {
    queryParam = `location=${location}&format=json`
    oauthCall = new myOauth.myOauth( 
        'get',
        appId, 
        apiKey, 
        apiSecret, 
        queryParam
    );
    try {
        const response = await oauthCall.Yahoo('https://weather-ydn-yql.media.yahoo.com/forecastrss?');
        const yahooWeatherRes = JSON.parse(response)
        let resProperties = Object.keys(yahooWeatherRes).map((item, i) => {
            return item;
        }).sort();
        console.log(" **** Properties *********", resProperties)
        console.log(yahooWeatherRes);
        botMsg = buildWeatherMsg(yahooWeatherRes);
        res.send(botMsg);
    } catch (err) {
        console.log(err)
        res.send(err.message);
    }
}
/*****************************************************************************/

/************* Build Bot Message *********************************************/
function buildWeatherMsg (yahooWeatherRes) {
    let current = yahooWeatherRes.current_observation;
    let windDirection = findDirection(parseInt(current.wind.direction));
    botMsg = `Weather for ${yahooWeatherRes.location.city}, ${yahooWeatherRes.location.region}\n ` +
            `  *Currently, it is ${current.condition.text} and ${current.condition.text}` +
            ` with winds traveling ${windDirection} at ${current.wind.speed}mph. - Feels like ${current.wind.chill}F*\n` +
            '**Forecast for the rest of the week:**\n';
    // Iterate through each day forecast
    yahooWeatherRes.forecasts.forEach((item, i) => {
        let dateStringLong = new Date(item.date * 1000).toString()
        let dateStringIndex = dateStringLong.search(/ ([0-9]{1,2}\:){2}/i); // Find timestamp
        let dateString = dateStringLong.slice(0, dateStringIndex); // Parse Date info until timestamp
        botMsg += `**${dateString}** -- ` +
                `  **Low**: ${item.low}, **High**: ${item.high}\n` +
                `   **Expect**: ${item.text}\n`;
    })
    return botMsg;
}
/*****************************************************************************/

/************* Translate Direction Integer ***********************************/
function findDirection (directionNum) {
    const directionCompare = {
        "North": 0,
        "NothEast": 45,
        "East": 90,
        "SouthEast": 135,
        "South": 180,
        "SouthWest": 225,
        "West": 270, 
        "NorthWest": 315
    }
    const directionMapArr = Object.keys(directionCompare).map(item => {
        return item;
    })
    let direction = directionMapArr.forEach((index, i) => {
        // See if direction difference is within ~45 degrees
        let dirCheck = directionCompare[index] - directionNum;
        if (dirCheck >= -27 && dirCheck <= 28) {
            return index;
        } else if (i == directionMapArr.length -1 ) {
            return "Fuck if I know"
        }
    })
    console.log(`Passed: ${directionNum},   got: ${direction}`);
    return direction;
}

/*****************************************************************************/