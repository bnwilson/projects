const fortuneTeller = require("./fortune-teller");

const fortune = new fortuneTeller();
const myFortune = fortune.getFortune();
console.log(myFortune);
// console.log(fortune);
