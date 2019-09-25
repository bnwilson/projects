const Employee = require('./Employee');
const Patient = require('./Patient');
const specialtyAreas = ["Heart", "Brain", "Ear and throat", "Foot", "Allergies", "Family"];
const getRandomSpecialArea = () => {
    return specialtyAreas[Math.floor(Math.random()*specialtyAreas.length)]
}

class Doctor extends Employee {
    constructor (name, id, salary) {
        super(name, id, salary);
        this.specialty = getRandomSpecialArea();
        this.careLevel = 3;
        this.canDrawBlood = true;
    }
    careForPatient(patient) {
        if (!(patient instanceof Patient)) {
            throw new Error("Can't care for anything other than a Patient")
        }
        // Write Patient enteraction here
        patient.receiveCare(this.careLevel);
        }
    
}

module.exports = Doctor;

