const Surgeon = require('./Surgeon');

const Patient = require('./Patient');

describe("Surgeon", () => {
    //Arrange
   const underTest = new Surgeon("Ned", 1, 120000);
    describe("operateOnPatient", () => {
        test("should return Error for not passing Patient object", () =>{
            //Arrange
            let testObject = "This is just a string";
            //Act and Assert
            expect(() => {
                underTest.operateOnPatient(testObject);
            }).toThrow("Are you crazy? Surgeon's shouldn't operate on anything other than Patients!")
        });
    });

});