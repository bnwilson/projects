const Doctor = require ('./Doctor');
const Patient = require('./Patient');
// const underTest = new Doctor("Oz", 15, 90000);
const Timmy = new Patient("Timmmy Jones", 15 );

describe("Doctor", () => {
    //Arrange
    const underTest = new Doctor("Ned", 1, 120000);
    describe("operateOnPatient", () => {
        test("should return Error for not passing Patient object", () =>{
            //Arrange
            let testObject = "This is just a string";
            //Act and Assert
            expect(() => {
                underTest.careForPatient(testObject);
            }).toThrow("Can't care for anything other than a Patient");
        });
    });
});