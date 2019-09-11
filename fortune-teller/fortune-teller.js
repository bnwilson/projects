const input = require("readline-sync").question;
const numInput = require("readline-sync").questionInt;

// List of ROYGBIV colors
const ROYGBIV = [
    "Red", "Orange", "Yellow", "Green", "Blue", "Indego", "Violet"
];
// Get color and validate input
const getColor = () => {
    let colorHelp = () => {
        console.log(" ** ROYGBIV colors **\n", ROYGBIV.join(", "), "**");
        helpColor = input("Okay, now pick out your favorite ROYGBIV color > ");
        return helpColor;
    }
    let col = input("What is your favorite ROYGBIV color? type 'help' for a list of colors. > ");
    // Spit out ROYGBIV colors if 'help' is inserted
    let color = (col.match(/^help$/i)) ? 
        colorHelp() :
        col

    return color;
};

// Properties: 
//     string::firstName, string::lastName, int::age, int::birthMonth, string::favColor, int::numOfSiblings
class fortuneTeller {
    constructor() {
        this.firstName = input("What is your First Name? > ");
        this.lastName = input("What is your Last Name? > ");
        this.age = numInput("What is your age (ex. 32)? > ");
        this.birthMonth = numInput("What's your  birth month (1 - 12)? > ");
        this.favColor = getColor();
        this.numOfSiblings = input("How many siblings do you have? > ");
    }
    get numOfSiblings() {
        return this._numOfSiblings;
    };
    set numOfSiblings(newSiblings) {
        let _numOfSiblings = (newSiblings < 11) ? 
            newSiblings : 
            numInput(`Seriously? ${newSiblings} siblings? Be Honest please.. >`);
        this._numOfSiblings = _numOfSiblings;
    };
    getFortune() {
        const COLOR_FORTUNE = {
            "red": "Maserati",
            "orange": "Stallion",
            "yellow": "Chariot",
            "green": "Taxi",
            "blue": "Rickshaw",
            "indigo": "Motor Scooter",
            "violet": "Flying Saucer"
        };
        const VACA_HOMES = [ "Boco Raton, FL", "Nassau, Bahamas", "Ponta Negra, Brazil", 
                             "Portland, Oregan", "Baton Rouge, LA", "Cherynoble, Ukraine"
                           ];
        const age = this.age;
        const firstName = this.firstName;
        const lastName = this.lastName;
        const birthMonth = this.birthMonth;
        const favColor = this.favColor;
        const numOfSiblings = this.numOfSiblings;
        // Start fortune logic
        const retireFortune = (age % 2 == 0) ? 12 : 14;
        const vacaHomeFortune = () => {
            if (numOfSiblings >= 0 && numOfSiblings <= 3) {
                return VACA_HOMES[numOfSiblings];
            } else if (numOfSiblings > 3) {
                return VACA_HOMES[4];
            } else {
                return VACA_HOMES[5];
            }
        }
        const transportFortune = () => {
            let colorLowerCase = favColor.toLowerCase();
            if (COLOR_FORTUNE.hasOwnProperty[colorLowerCase]) {
                return COLOR_FORTUNE[colorLowerCase];
            } else {
                return "piece of crap";
            }
        };
        const accountFortune = () => {
            let balances = ["$256,000.76", "$3,687,105.42", "$86.23", "$0.03"];
            if (birthMonth =>1 && birthMonth <= 4) {
                return balances[0];
            } else if (birthMonth > 4 && birthMonth <= 8) {
                return balances[1];
            } else if (birthMonth > 8 && birthMonth <= 12) { 
                return balances[2];
            } else {
                return balances[3];
            }
        };
        const finalFortune = `${firstName} ${lastName} will retire in ${retireFortune} with ${accountFortune} ` +
                            `in the bank, a vacation home in ${vacaHomeFortune},` +
                            `and travel by ${transportFortune}.`
        return finalFortune;
    };
}

module.exports = fortuneTeller;

// ** Requirements for Fortune **
// * age * -> Retirement
// (condition) If the user's age is…	(example) then the user will retire in…
// odd	14 years
// even	12 years
// 
// * numOfSiblings * -> Vacation Home
// (condition) If the user's number of siblings is…	(example) then the user's vacation home will be in…
// 0	Boca Raton, FL
// 1	Nassau, Bahamas
// 2	Ponta Negra,Brazil
// 3	Portland, Oregon
// greater than three	Baton Rouge, LA
// less than zero	Chernobyl, Ukraine
//
// * favColor * -> transport
// (condition) If the user's favorite color is…	(example) then the user's mode of transportation will be…
// red	Maserati
// orange	stallion
// yellow	chariot
// green	taxi
// blue	rickshaw
// indigo	motor scooter
// violet	flying saucer
//
// * birthMonth * -> accountBalance
// (condition) If the user's birth month is…	(example) The user's balance will be…
// 1-4	$256,000.76
// 5-8	$3,687,105.42
// 9-12	$86.23
// anything else	$0.00
//
// ** Final **
// [First Name] [Last Name] will retire in [# of years] 
//  with [bank balance] in the bank, a vacation home in [location], 
//  and travel by [mode of transportation].