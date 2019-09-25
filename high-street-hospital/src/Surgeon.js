// const Employee = require('./Employee');
// const specialtyAreas = ["Plastic", "Brain", "Heart", "Foot", "General", "Gastro"];
// const getRandomSpecialArea = () => {
//     return specialtyAreas[Math.floor(Math.random()*specialtyAreas.length)]
// }

// class Surgeon extends Employee {
//     constructor(name, id, salary) {
//         super(name, id, salary);
//         this.specialty = getRandomSpecialArea();
//         this.careLevel = 5;
//         this.isOperating = false;
//     }
//     operateOnPatient(patient) {
//         if (!(patient instanceof Patient)) {
//             throw new Error("Are you crazy? Surgeon's shouldn't operate on anything other than Patients!");
//         }
//         this.isOperating = true;
//         patient.receiveOperation(this.careLevel);
//     }
// }

// module.exports = Surgeon;


const Employee = require('./Employee');
const specialtyAreas = ["Plastic", "Brain", "Heart", "Foot", "General", "Gastro"];
const getRandomSpecialArea = () => {
    return specialtyAreas[Math.floor(Math.random()*specialtyAreas.length)]
}
const Patient = require('./Patient');

class Surgeon extends Employee {
    constructor(name, id, salary) {
        super(name, id, salary);
        this.specialty = getRandomSpecialArea();
        this.isOperating = false;
    }
    operateOnPatient(patient) {
        if (!(patient instanceof Patient)) {
            throw new Error("Are you crazy? Surgeon's shouldn't operate on anything other than Patients!");
        }
        this.isOperating = true;
        patient.receiveOperation(this.careLevel);
        
    }

}

module.exports = Surgeon;