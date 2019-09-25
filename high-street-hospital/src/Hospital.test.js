const Hospital = require('./Hospital');

const underTest = new Hospital("Testspital");


describe('Hospital', () => {
    describe('constructor', () => {
        test('should generate staff, patients, and increase runningId', () => {
            //Arrange
            let doctorLen = underTest.doctors.size;
            let nursesLen = underTest.nurses.size;
            let surgeonsLen = underTest.surgeons.size;
            let janitorsLen = underTest.janitors.size;
            let receptionistsLen = underTest.receptionists.size;
            let patientsLen = underTest.patients.length;
            //Act
            
            //Assert
            expect(doctorLen).toBeGreaterThan(0);
            expect(nursesLen).toBeGreaterThan(0);
            expect(surgeonsLen).toBeGreaterThan(0);
            expect(janitorsLen).toBeGreaterThan(0);
            expect(receptionistsLen).toBeGreaterThan(0);
            expect(patientsLen).toBeGreaterThan(0);
        })
    })
    describe('getBudget', () => {
        test('should output a budget at least greater than 1 employee (45000)', () =>{
            //Arrange
            let currentBudget = underTest.getBudget();
            //Act

            //Assert
            expect(currentBudget).toBeGreaterThan(45000);
        })
    })
    describe('addBloodToPool', () => {
        test('should add 2 to blood pool', () => {
            //Arrange
            let currentBlood = underTest.bloodPool;
            //Act
            underTest.addBloodToPool(2);
            //Assert
            expect(underTest.bloodPool).toEqual(currentBlood + 2)
        })
    })
    describe('assignPatientsToNurses', () => {
        test('should distribute patients to this.nurses', () => {
            //Arrange
            let currentPatients = 0;
            const nurseArray = [...underTest.nurses.values()]
            nurseArray.forEach(nurse => {
                let nursePatientCount = nurse.patients.size;
                currentPatients += nursePatientCount;
            });
            //Act
            underTest.assignPatientsToNurses();
            //Assert
            expect(currentPatients).toEqual(0);
            expect(underTest.getAssignedPatientCount()).toEqual(underTest.patients.length);
        })
    })

});