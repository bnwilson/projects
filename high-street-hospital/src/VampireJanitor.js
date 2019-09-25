const Patient = require('./Patient');
const Janitor = require('./Janitor');

class VampireJanitor extends Janitor{
    constructor(name, id, salary){
        super();
        this.canDrawBlood = true;
        this.salary = salary; 
    }
    drawBlood(patient, amount) {
        if (this.canDrawBlood) {
            if (!(patient instanceof Patient) ) {
                throw new Error("Can't drink blood for anything other than a Patient they are the best")
            }
            return patient.getBloodDrawn(amount);
        }
    }

}
module.exports = VampireJanitor;