#!/bin/sh
# Discord Email/Pass and API Key
export HUBOT_DISCORD_EMAIL=''
export HUBOT_DISCORD_PASSWORD=''
export HUBOT_DISCORD_TOKEN=''
export HUBOT_DISCORD_STATUS_MSG="#justbotthings"
# Google API Keys
export HUBOT_GOOGLE_CSE_ID=''
export HUBOT_GOOGLE_CSE_KEY=''
# Yahoo! Weather API
# Base url -  https://weather-ydn-yql.media.yahoo.com/forecastrss
#  location - ?location=
#  NOTE: append '&format=json'
export HUBOT_YAHOO_APPID=''
export HUBOT_YAHOO_CLIENT_ID=''
export HUBOT_YAHOO_CLIENT_SECRET=''
# Currency API key
export CURRENCY_API_KEY=''
./bin/hubot -a discord
