const Nurse = require('./Nurse');
const Patient = require('./Patient');

//Arrange
const underTest = new Nurse("Jackie", "1", 45000)
const failTestObject = "This is just a string";
const testPatient = new Patient("Johnathan vanwinkle", 2);
const testPatientTwo = new Patient("Boris McBride", 5);
const testPatientThree = new Patient("Mike Michaels", 3);

describe("Nurse", ()=>{
    describe("care", ()=>{
        test("should return Error for not passing Patient object", () =>{
            //Act and Assert
            expect(() => {
                underTest.careForPatient(failTestObject);
            }).toThrow("Can't care for anything other than a Patient")
        });
    })
    describe("assignPatient", () => {
        test("should return Error for not passing Patient object", () => {
            //Act and Assert
            expect(() => {
                underTest.assignPatient(failTestObject);
            }).toThrow("Can't care for anything other than a Patient")
        });
        test("should add new Patient to patients prop", () => {
            //Arrange
            let currentPatientCount = underTest.patients.size;
            //Act
            underTest.assignPatient(testPatient);
            //Assert
            expect(underTest.patients.size).toEqual(currentPatientCount + 1);
            console.log(underTest.patients.get(testPatient.id))
            expect(underTest.patients.get(testPatient.id)).toBe(testPatient);
        });
    });
    describe("removePatient", () => {
        test("should return Error for not passing Patient object", () => {
            //Act and Assert
            expect(() => {
                underTest.assignPatient(failTestObject);
            }).toThrow("Can't care for anything other than a Patient")
        });
        test("should remove Patient to patients prop", () => {
            //Arrange            
            underTest.assignPatient(testPatient);
            underTest.assignPatient(testPatientThree);
            underTest.assignPatient(testPatientTwo);
            let currentPatientCount = underTest.patients.size;
            //Act
            underTest.removePatient(testPatient);
            //Assert
            expect(underTest.patients.size).toEqual(currentPatientCount - 1);
           
        });
    });
   
})
