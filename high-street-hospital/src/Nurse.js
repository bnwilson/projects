const Employee = require('./Employee');
const Patient = require('./Patient');

class Nurse extends Employee {
    constructor(name, id, salary) {
        super(name, id, salary);
        this.careLevel = 1;
        this.patients = new Map();
    }
    careForPatient(patient) {
        if (!(patient instanceof Patient) ) {
            throw new Error("Can't care for anything other than a Patient")
        }
        // Write Patient enteraction here
        patient.receiveCare(this.careLevel);
    }
    assignPatient(patient) {
        if (!(patient instanceof Patient) ) {
            throw new Error("Can't care for anything other than a Patient")
        }
        this.patients.set(patient.id, patient);
        patient.isAssigned = true;
    }
    removePatient(patient) {
        if (!(patient instanceof Patient) ) {
            throw new Error("Can't care for anything other than a Patient")
        }
        this.patients.delete(patient.id);
    }
    
}

module.exports = Nurse;
