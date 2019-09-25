const Patient = require("./Patient");
const underTest = new Patient("John Doe", 15);

describe("Patients",() => { 
   
    // May need to Change.
    describe("getBlood", ()=>{
        test('receive blood', ()=>{
            let actual = underTest.receiveBlood(3);
            expect(actual).toEqual(30);

            
        })
    })
    describe("receiveCare", () => {
        test("Health-Level adjusted", ()=>{
            let actual = underTest.receiveCare(3);
            expect(actual).toEqual(10);
        })
    })
    describe("getBloodDrawn", ()=>{
        test('reduce Blood', ()=>{
            let actual = underTest.getBloodDrawn(1);
            expect(actual).toEqual(29);

            
        })

    })
    describe("currentStatus", () => {
        test("Does it reflect status", ()=>{
            let actual = underTest.currentStatus();
            expect(actual).toMatch( "I am okay for now, check in with me later");
        })

    })
  
    

})