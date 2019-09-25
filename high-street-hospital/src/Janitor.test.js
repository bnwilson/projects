const Janitor = require('./Janitor');
const Patient = require('./Patient');

//Arrange
const underTest = new Janitor("John", "3");
const testPatient = new Patient("Bruno Saturn", 8);

describe("Janitor", ()=>{
    describe("constructor items", ()=>{
        test("is salary what it ssuppose to be", ()=>{
            expect(underTest.salary).toBe(40000);
        })
        
    })
    describe("workStatus", ()=>{
        test("does it change status", ()=>{
            let actual = underTest.workStatus();
            expect(actual).toBe("is free to work");
        })
    })
    describe("work status", () => {
        test("does working work?",()=>{
            let actual = underTest.setWorking();
            expect(actual).toBeTruthy();
        })
    })        
})

