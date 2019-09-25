
const BlueCollar = require("./BlueCollar");
const Janitor = require("./Janitor");

// Testing Non-Abstract extension of BlueCollar
//Arrange
const underTest = new Janitor("Billy Bob Vanderbilt", 17, 200705);

describe("BlueCollar", ()=>{
    describe("Assignment", () => {
        test("should be abstract", () => {
            expect(() => {
                new BlueCollar("name","334");
            }).toThrow("BlueCollar is an Abstract Class and can not be initialized!");
        });
    });
    describe("switchWorkingStatus", () => {
      test("should switch the isWorking from false to true", () => {
        //Arrange
        let currentStatus = underTest.isWorking;
        //Act
        underTest.switchWorkingStatus();
        //Assert
        expect(currentStatus).toBeFalsy();
        expect(underTest.isWorking).toBeTruthy();
      })
    })
})