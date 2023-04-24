myOauth = require('./myOauth')
const APP_ID = process.env.HUBOT_YAHOO_APPID;
const HUBOT_YAHOO_CLIENT_ID = process.env.HUBOT_YAHOO_CLIENT_ID || "";
const HUBOT_YAHOO_CLIENT_SECRET = process.env.HUBOT_YAHOO_CLIENT_SECRET || "";
const TEST_LOCATION = 'location=anaheim,ca&format=json'

const testOauth = async () => {
    thisTest = new myOauth.myOauth( 
        'get',
        APP_ID, 
        HUBOT_YAHOO_CLIENT_ID, 
        HUBOT_YAHOO_CLIENT_SECRET, 
        TEST_LOCATION
        );
    try {
        stuff = await thisTest.Yahoo('https://weather-ydn-yql.media.yahoo.com/forecastrss?');
        // console.log(stuff);
        return stuff;
    } catch (err) {
        console.log(err)
        return err;
    }
}

// testOauth();