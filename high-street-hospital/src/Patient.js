
const BLOOD_LEVEL = 20;
const HEALTH_LEVEL = 10;
const MAX_BLOOD_LEVEL = 30;
const MAX_HEALTH_LEVEL = 20;
const MIN_BLOOD_LEVEL = 10;
const MIN_HEALTH_LEVEL = 5;
const HEALTH_TICK = 1;
const BLOOD_TICK = 1;

class Patient{
    /* Not sure if they want blood, health level to abstracted.
    will place in regular format for now and will review with Donny */

    /*Receives blood, care, surgery, 
    doctor *2, nurse* 1, surgeon *4;*/

    constructor(name="John Doe", id) {
        this.name = name;
        this.blood_level = BLOOD_LEVEL;
        this.health_level = HEALTH_LEVEL;
        this.id = id;
        this.isAssigned = false;
    }

    tick(){
        // Patient health will increment if at or above Default level
        //                  or decrement if below Default level
        if (this.health_level >= HEALTH_LEVEL) {
            (this.health_level >= MAX_HEALTH_LEVEL - HEALTH_TICK) ?
                this.health_level = MAX_HEALTH_LEVEL :
                this.health_level += HEALTH_TICK
        } else if (this.health_level < HEALTH_LEVEL) {
            (this.health_level <= MIN_HEALTH_LEVEL + HEALTH_TICK) ?
                this.health_level = MIN_HEALTH_LEVEL :
                this.health_level -= HEALTH_TICK
        }
                    
        // Increase blood over time
        (this.blood_level >= MAX_BLOOD_LEVEL - 1) ?
            this.blood_level = MAX_BLOOD_LEVEL :
            this.blood_level += BLOOD_TICK
    }
    // Values have to be greater than one, maybe be suited to get paitent blood level back to perfect.
    receiveBlood(n){
        this.blood_level *= n;

        if(this.blood_level >= MAX_BLOOD_LEVEL){
            return this.blood_level = MAX_BLOOD_LEVEL;
        } 
        else {
            return this.blood_level; 
        }
    }

    receiveCare(n){
        if(n>0 && n< 5){
        this.health_level *= n;
            if(this.health_level >=10){
                return this.health_level = HEALTH_LEVEL;
            }
            else{
                return this.health_level;
            }
        }

    }

    getBloodDrawn(n){
        if(this.blood_level >0){
            this.blood_level -= n;
            return this.blood_level;
        }else{
            return 0;
        }
    }

    currentStatus() {
        if(this.health_level>= 14 || this.health_level>= 7 ){
            return "I am okay for now, check in with me later";
        }
        else if (this.HEALTH_LEVEL >= MIN_HEALTH_LEVEL || this.BLOOD_LEVEL>= MIN_BLOOD_LEVEL){
            return "I need help";
        }else if ( this.BLOOD_LEVEL >=3|| this.HEALTH_LEVEL >=3){
            return " I don't feel the best need help asap";
        }else{
            return ".............................. patient has died.";
        }
    }
}


module.exports = Patient;



