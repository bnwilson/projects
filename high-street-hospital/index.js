// Main Application/Interface

const Hospital= require('./src/Hospital');
const input = require('readline-sync');



console.log(doctorsMap);
console.log("Welcome to High Street Hospital ");
console.log("_______________________________________\n");

console.log("_______________________________________\n");
console.log("(1) Display a list of Employees of High Street Hospital")
console.log("(2) Display a list of Employees salaries")
console.log("(3) Display a list of Employees who can draw blood?")
console.log("(4) Display a list of Employees that can provide care?")
let choice = input.question("How can we assist? \n Please enter a number that best matches your intended selection: ");
while(choice != 'quit'){

    const highHospital = new Hospital('higstreet', );
switch(choice.trim()){
    case "1":
        console.log("Here are a list of our doctors:\n_________________________________")
        let docList = highHospital.doctors;

        console.log(docList);
    
        break;
    case "2":
        //loop through array of employees and report salary
        break;
    case "3":
        ////loop through array of employees and report candrawblood = true
        break;
    case "4":
        //loop through employees that have care level.L0
        break;
    default:
        console.clear();
        console.log("What would you like to do?")
        console.log("_______________________________________\n________________________________________\n_________________________________________");
        console.log("(1) Display a list of Employees of High Street Hospital")
        console.log("(2) Display a list of Employees salaries")
        console.log("(3) Display a list of Employees who can draw blood?")
        console.log("(4) Display a list of Employees that can provide care?");
        console.log("(5) Display a list of Employees that can provide care?")
        choice = "";
        choice = input.question("How can we assist? \n Please enter a number that best matches your intended selection: ");
        break;

}


}