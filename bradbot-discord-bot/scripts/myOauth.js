const OAUTH = require('oauth');

exports.myOauth = class myOauth {
    constructor ( httpMethod, appId, consumerKey, consumerSecret, queryParams) {
        this.nonce = Math.random().toString(36).substring(2);
        this.signatureMethod = "HMAC-SHA1";
        this.timeStamp = parseInt(new Date().getTime() / 1000).toString();
        this.version = "1.0"
        this.httpMethod = httpMethod;
        this.appId = appId;
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
        this.queryParams = queryParams;
        this.header = { "X-Yahoo-App-Id": this.appId };
    }

    Yahoo (baseUrl) {
        let request = new OAUTH.OAuth(
            null,
            null,
            this.consumerKey,
            this.consumerSecret,
            this.version,
            null,
            this.signatureMethod,
            null,
            this.header
        );
        let fullUrl = baseUrl + this.queryParams;
        // const pullWeatherInfo = util.promisify(request.get);
        
        let response = new Promise((resolve, reject) => {
            request.get(fullUrl, null, null, (err, res, data) => {
                if (err) { 
                    // console.log(data);
                    reject(err);
                } else {
                    // console.log("Response*****", res, "**** Data****", data);
                    resolve(res);
                }
            })
        })
        return response;
    }
}
