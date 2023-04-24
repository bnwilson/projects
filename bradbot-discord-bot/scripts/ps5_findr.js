const popFindrStoreMap = require('./store_pid_map');
const popFindr = require('./popFindr');
// import popFindrStoreMap from './store_pid_map.json';
// import popFindr from './popFindr.js';
const TEST_AREA = '25'
const TEST_ZIP = "90210";
const TEST_STORE = "target";

module.exports = (robot) => {
    
}


async function getInventories() {
    const {method, finderUrl, token, gameStop, target, bestBuy} = popFindrStoreMap;
    const PS5Finder = new popFindr(finderUrl, token, TEST_ZIP, TEST_AREA);
    const storeMap = {
        gamestop: gameStop,
        target: target,
        bestbuy: bestBuy
    }
    const gameStopResults = await PS5Finder.getItemInventory(storeMap.gamestop.pid, storeMap.gamestop.webpage)
    const targetResults = await PS5Finder.getItemInventory(storeMap.target.pid, storeMap.target.webpage);
    const bestBuyResults = await PS5Finder.getItemInventory(storeMap.bestbuy.pid, storeMap.bestbuy.webpage);
    const results = {
        'gameStop': gameStopResults,
        'target': targetResults,
        'bestBuy': bestBuyResults
    }
    return results;
}

getInventories().then(res => console.log(res)).catch(err => err);
 


// PS5Finder.getItemInventory(storeMap[TEST_STORE].pid, storeMap[TEST_STORE].webpage);
// PS5Finder.getMultipleInventories(storeMap, TEST_ZIP, "30");