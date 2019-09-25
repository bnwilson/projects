const https = require('https');
const fs = require('fs');

const getRandomNameApi = (numOfNames) => {
    // Inputs: <int> Number of Random names to Generate from API
    // Outputs: <str arr> Array of First + Last Name
    const randomNameUrl = "https://uinames.com/api/"
    const randomNameParam = `?amount=${numOfNames}&region=United%20States`
    const fullUrl = randomNameUrl + randomNameParam
    return new Promise(
        (resolve, reject) => {
            let req = https.get( fullUrl, (res) => {
                let data = '';
                res.on('data', chunk => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        body = JSON.parse(data)
                        resolve(body);
                    } catch(e) {
                        reject(e)
                    }
                });
            })
            req.on("error", err => {
                reject(err);
            })
            req.end();
        }
    )
}

const parseNameArray = (nameObjects) => {
    let nameArray = []
    try {
        for (let i = 0; i < nameObjects.length; i++) {
            nameArray.push(`${nameObjects[i].name} ${nameObjects[i].surname}`);
        }
        return nameArray;
    } catch (error) {
        throw new Error(error);
    }
}

const main = (nameFile, numOfNames=10) => {
    getRandomNameApi(numOfNames)
    .then(nameObjectArray => {
        let parsedNames = parseNameArray(nameObjectArray);
        let arrayOfNameObjs = "module.exports = " + JSON.stringify(parsedNames);
        fs.writeFile(nameFile, arrayOfNameObjs, (err) => {
            if (err) throw err;
        });
    })
    .catch(err => {
        throw new Error(err);
    })
}
module.exports = main;

if (require.main === module) {
    try {
        console.log("running");
        main('name-array.js', 120);
    } catch(err) {
        throw err;
    }
}