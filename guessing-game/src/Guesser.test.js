const guessingGame = require('./Guesser');

describe("guessingGame", () => {
    test("expect incorrect guess when " +
        "userGuess is different from secretNumber", () => {
        //Arrange
        const underTest = guessingGame.guessingGame
        //Act
        let endGame = guessingGame(3, 4);
        //Assert
        expect(endGame).toBeFalsy();
        });
})