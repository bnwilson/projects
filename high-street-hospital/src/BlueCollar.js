const Employee = require("./Employee");

class BlueCollar extends Employee{

    constructor(name, id, salary){
        super(name , id, salary);
        if (this.constructor == BlueCollar) {
            throw new Error("BlueCollar is an Abstract Class and can not be initialized!");
        }
        this.isWorking = false;
    }

    switchWorkingStatus() {
        this.isWorking = !this.isWorking;
    }

    tick() {
        // Randomly switching working status
        ((Math).ceil(Math.random()*10) > 7) ? this.switchWorkingStatus() : null;

    }
}

module.exports = BlueCollar;
