const AbstractEmployee = require('./Employee');
const Doctor = require('./Doctor');
const Patient = require('./Patient');
const Janitor = require('./Janitor');
//const Employee = require('/');

//Assign
const underTest = new Doctor("Oz", 15, 90000);
const testJanitor = new Janitor("Gruffy", 19, 2000);
const Timmy = new Patient("Timmmy Jones", 15 );

describe("Employee", () => {
    describe("constructor", () => {
        test("should throw Error if instanced directly", () => {
            expect(() => {
                new AbstractEmployee("Bobby", 1);
            }).toThrow("Employee is an Abstract Class")
        })
    })
    describe("getblood", ()=>{
        test("blood_level of Patient should be subtracted by 3", () =>{
            //Arrange
            let currentBlood = Timmy.blood_level;
            //Act
            let actual = underTest.drawBlood(Timmy, 3);
            //Assert
            expect(Timmy.blood_level).toEqual(currentBlood - 3);
        })
    })
    describe("drawBlood", () => {
        test("blood_level should not change on Patient as Janitor.canDrawBlood is false", () => {
            //Arrange
            let currentBlood = Timmy.blood_level;
            //Act
            testJanitor.drawBlood(Timmy, 2);
            //Assert
            expect(Timmy.blood_level).toEqual(currentBlood)
        })
    })
})