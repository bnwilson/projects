const Patient = require('./Patient');

class Employee {
    // Abstract Class
    constructor (name, id, salary=0) {
        if (this.constructor === Employee) {
            throw new Error("Employee is an Abstract Class and can not be initialized!");
        }
        this.name = name;
        this.id = id;
        this.salary = salary; // Salary will probably be set by subclass
        this.canDrawBlood = false;
    }
    drawBlood(patient, amount) {
        if (this.canDrawBlood) {
            if (!(patient instanceof Patient) ) {
                throw new Error("Can't care for anything other than a Patient")
            }
            return patient.getBloodDrawn(amount);
        }
    }
}

module.exports = Employee;