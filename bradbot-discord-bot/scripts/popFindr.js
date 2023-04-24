// const axios = require('axios');
import axios from 'axios';
import nodeHtmlParser from 'node-html-parser';
const {parse} = nodeHtmlParser;

class popFindr {
    constructor(searchUrl, findrToken, zip="", rangeDefault="25", debug=false) {
        // Throw Error if no arg
        if (!findrToken) {
           throw new Error("Token required for initialization!");
        }
        // Set searchRange, token, zip
        this.rangeDefault = rangeDefault;
        this._searchUrl = searchUrl;
        this._token = findrToken;
        this._zip = zip;
        this.debug = debug;
    }
    // ***** Properties *****
    // zipCode
    get zipCode() {
        return this._zip;
    }
    set zipCode(zip) {
        this._zip && this._zip === zip ?
            null :
            this._zip = zip;
    }
    // webToken
    get webToken() {
        return this._token;
    }
    set webToken(token) {
        this._token && this._token === token ?
            null :
            this._token = token;
    }
    // searchUrl
    get searchUrl() {
        return this._searchUrl;
    }
    set searchUrl(url) {
        this._searchUrl = url;
    }
    // **********

    // ***** Methods *****
    async getMultipleInventories(storesMap={}, zipCode="", searchRange="") {
        const results = {};
        let range = searchRange || this.rangeDefault;
        let zip = zipCode || this.zipCode;
        const storeKeys = Object.keys(storesMap);
        if (storeKeys.length) {
            storeKeys.forEach(async (storeKey) => {
                let {pid, website} = storesMap[storeKey];
                const storeResult = await this.getItemInventory(pid, website);
                results[storeKey] = storeResult;
            });
            
        } else {
            console.log("Array of Objects ({pid, storeName}) required!")
        }
        return results;
    }

    async getItemInventory(pid, storeName, searchRange="", httpMethod="get") {
        let axiosRequestConfig = {
            method: httpMethod,
            url: this.searchUrl,
            responseType: 'document',
            params: {
                pid: pid,
                zip: this.zipCode,
                range: searchRange || this.rangeDefault,
                webpage: storeName,
                token: this.webToken,
            }
        }
        
        try {
            const res = await axios(axiosRequestConfig);
            const resHtmlText = res.data;
            const parsedResponse = this.parseItemInventory(resHtmlText);
            if (this.debug) {
                console.log("Response -------> ", res.data);
                console.log(parsedResponse);
            }
            return parsedResponse;
            
        } catch (reqError) {
            console.log(axiosRequestConfig);
            console.log(reqError, reqError.message);
            return reqError;
        }
    }

    parseItemInventory(htmlResponse='') {
        let htmlString1 = htmlResponse.replace(/(\n|\\n)/ig,'');
        let htmlString2 = htmlString1.replace(/\<script.+$/ig, '');
        const parsedRes = parse(htmlString2);
        const columns = [];
        const results = [];
        const mappedResults = [];
        parsedRes.querySelectorAll('thead.thead-light tr th').forEach(x => {
            (x.childNodes) ?
                x.childNodes.forEach(item => columns.push(item.rawText)) :
                x.forEach(y => columns.push(y.rawText));
        });
        parsedRes.querySelectorAll('table tbody tr').forEach(tRow => {
            let data = tRow.childNodes.map(tItem => tItem.rawText);
            data.length === 3 ? results.push(data) : null;
        });
        results.forEach(result => {
            let lineItem = {};
            for (let x=0; x < columns.length; x++) {
                lineItem[columns[x]] = result[x];
            }
            mappedResults.push(lineItem);
        });
        if (this.debug) {
            console.log('<---- Columns')
            console.log(columns);
            console.log('Columns --->')
            console.log('Results Data --->')
            console.log(results);
            console.log('<---- Results Data')
        }

        return mappedResults;
    }
}
export default popFindr;
// module.exports = popFindr;