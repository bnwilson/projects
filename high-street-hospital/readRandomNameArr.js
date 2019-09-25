const fs = require('fs');
const buildNameArrayFile = require('./buildRandomNamesArr');

const NAME_FILE = "name-array.json";

const readRandomNameArr = async (numOfNames) => {
    let promise = new Promise((resolve, rej) => {
        setTimeout(() => {
            try {
                buildNameArrayFile(NAME_FILE, numOfNames);
                resolve();
            } catch (err) {
                rej(err);
            }
        }, 500);
    })
    return promise;
}

const buildNameArray = async () => {
    let promise = new Promise(res, rej => {
        setTimeout(() => {
            try {
                let nameArray = require(`./${NAME_FILE}`) 
                res(nameArray)
            } catch (err) {
                rej(err);
            }
        }, 600);
    });
    return promise;
}

async function buildAndGetNames(numOfNames=10) {
    let buildFile = await readRandomNameArr(numOfNames);
    let nameArray = await buildNameArray();
    return nameArray;
}

const main = async (numOfNames) => {
    let response = await buildAndGetNames(15);
}

module.exports = main;