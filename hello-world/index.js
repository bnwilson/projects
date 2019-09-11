 import { question } from "readline-sync";
//import "readline-sync";
const helloWorld = () => {
    console.log("********* First Input *********");
    console.log(question("What is your name? > "));
    console.log("************");
    return true;
}
helloWorld();
