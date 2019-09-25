const Receptionist = require("./Receptionist");
const underTest = new Receptionist(name ="megan");


describe("Janitor", ()=>{
    describe("constructor items", ()=>{
        test("is salary what it ssuppose to be", ()=>{
            expect(underTest.salary).toBe(45000);
        })
        
    })
    
    describe("workStatus", ()=>{
        test("does it change status", ()=>{
            let actual = underTest.workStatus();
            expect(actual).toBe(`megan is free to work`);
        })
    })
    describe("work status", () => {
        test("does working work?",()=>{
            let actual = underTest.setWorking();
            expect(actual).toBeTruthy();
        })
    })
})
    
        