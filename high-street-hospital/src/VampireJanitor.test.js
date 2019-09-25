const  Patient = require('./Patient');
const  VampireJanitor = require('./VampireJanitor');

const underTest = new VampireJanitor("Hugo Strange", "35", 40000);
const tim = new Patient("Wanda Reynolds", "58");

describe("Vampire Janitor", ()=>{
    describe("constructor can draw blood", ()=>{
        test("Does the super function pass", ()=>{
            let actual = underTest.canDrawBlood;
            expect(actual).toBeTruthy();
        })
    })
    describe("drawBlood",()=>{
        test("does wanda get affected",()=>{
            
             let currentBlood = tim.blood_level;
             //Act
             underTest.drawBlood(tim, 2);
             //Assert
            expect(tim.blood_level).toEqual(currentBlood-2);
        })
    })
})