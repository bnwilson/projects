// Guessing Game
// Objective
// Create a command line based number guessing game, where users have to guess a number between 1 and 10. Build the application in a series of iterations, with each iteration being a functional (though incomplete) version of the final application.

const input = require('readline-sync');

const guessingGame = (userGuess, secretNumber) => {
    const END_GAME = -1;
    const HELP = 0;
    const hintArray = ["deadOn", "You're like, so so close right now", "It's pretty toasty right here.", "Pretty warm here if you ask me", "You guess was about room temperature",
                       "Not warm, not cold. Right in the middle", "You're gonna need a sweater with those guesses!", 
                       "Is it winter time already?", "Wow, are you trying to lose? you (almost) couldn't be futher away!", "It feels like Antarctica..",
                       "*shivers*", "Please quit while you're behind", "You're so far away, omg.", "I can't see my house from here.", "Type -1 to quit, you don't stand a chance",
                       "I'm speechless... you might be the worst guesser I've ever seen", "Ugh, you're still so far away from the right number."];
    const difference = Math.abs(userGuess - secretNumber)
    const hint = (difference > hintArray.length) ? 
        hintArray[Math.floor(Math.random()*(hintArray.length - 9)) + 9] :
        hintArray[difference]
    switch (userGuess) {
        case secretNumber:
            console.log(" *** ~*~*~*~* Congrats *~*~*~*~* *** ");
            console.log("  You win!!!!!!!!!!!!! =)");
            endGame = true;
            break;
        case END_GAME:
            console.log("Way to give up like a little punk-ass bitch");
            endGame = true;
            break;
        case HELP:
            console.log("Help number initiated!!!!!\n  - 0: Help Messsage, " +
                        "- -1: Quit Game (wuss), - <right_number.jpg>: You Win if you guess this." )
            endGame = false;
            break;
        default:
            console.log("Sorry, that was incorrect")
            console.log("Here's a hint --> " + hint)
            endGame = false;
            break;
    }
    return endGame;
}
module.exports = guessingGame;
const playGame = () => {
    /********* Starter Values **********/
    let guessCount = 0;
    let endGame = false;
    const secretNumber = Math.ceil(Math.random()*10);
    /***********************************/
    /******** Global Variables *********/
    const MAX_GUESSES = 3
    /***********************************/
    let gameMessage = " ** ~ Guessing Game v0.7322653229134234 ** ~" +
    " To start, don't press anything! \n*********************** " +"\n" + 
    "\n Guess the number, 1 through 10";
    console.log(gameMessage)
    while (!endGame) {
        guess = input.questionInt(" > ");
        guessCount = (guess === -1 || guess === 0) ? 
            guessCount : guessCount +=1
        console.log("You guessed -> " + guess);
        endGame = guessingGame(guess, secretNumber);
        if (guessCount >= MAX_GUESSES) {
            console.log(" You lose!");
            if (input.question("Try again?\n 'y' or 'n' > ").toLowerCase === "y") {
                playGame();
            } else {
                console.log("Ending game...");
                endGame = true;
                break;
            }
        }
    }
    if (endGame) {
        return;
    }
}

if (require.main == module) {
    playGame();
}


// Skills Required
// Console I/O
// Random number generation
// IDE familiarity
// Basic types
// If statements
// Equality operators
// Loops
// Iterations
// Build the application in the following small iterations. It should function at completion of each iteration!

// When the user guesses 7, the game announces they have won. All other numbers lose.
// When the user guesses 0, the game provides instructions for the user.
// After guessing, the user can take one more guess (unless they won!)
// When the user guesses -1, the application should exit.
// The game should provide feedback that the secret number is > or < any incorrect guesses.
// The number should be random, instead of always 7.
// Stretch task: Give the user 3 tries before announcing they have lost.
// © We Can Code IT 2019
