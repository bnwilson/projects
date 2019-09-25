const BlueCollar = require("./BlueCollar");

class Janitor extends BlueCollar{
    constructor(name, id, salary=0){
        super();
        this.salary = 40000;
        this.working = false;
    }
    workStatus(){  
        if(this.working === true){
            return `is currently working`;
        }else{
            return `is free to work`;
        }

    }

    setWorking(){
        this.working = !this.working
        return this.working ;
        }


}




module.exports = Janitor

