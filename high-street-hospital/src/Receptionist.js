const BlueCollar = require("./BlueCollar");

class Receptionist extends BlueCollar{
    constructor(name, id, salary){
        super()
        this.salary = 45000;
        this.working = false;
        this.name = name;
    }
    workStatus(){   
        if(this.working === true){
            return `${name} is currently working`;
        }else{
            return `${name} is free to work`;
        }

    }

    setWorking(){
        this.working = !this.working
        return this.working ;
        }



}

module.exports = Receptionist;
