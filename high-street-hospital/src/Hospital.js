// Hospital class to hold Employees, Staff, and Patients, and 
// posseses interfaces to interact with internal objects
const Doctor = require('./Doctor');
const Nurse = require('./Nurse');
const Surgeon = require('./Surgeon');
const Janitor = require('./Janitor');
const Receptionist = require('./Receptionist');
const Patient = require('./Patient');
const randomNamesArr = require('../name-array');


const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

const EMPLOYEE_SALARIES = {
    'Doctor': 90000,
    'Nurse': 50000,
    'Surgeon': 120000,
    'Receptionist': 45000,
    'Janitor': 40000
}

const EMPLOYEE_COUNTS = {
    'Doctor': 2,
    'Nurse': 5,
    'Surgeon': 2,
    'Receptionist': 3,
    'Janitor': 3
}

const MIN_PATIENTS = 20;
const MAX_PATIENTS = 60;

class Hospital {
    constructor(name, employeeSalaries=EMPLOYEE_SALARIES, employeeCounts=EMPLOYEE_COUNTS, minPatients=MIN_PATIENTS, maxPatients=MAX_PATIENTS) {
        this.runningId = 0;
        this.name = name;
        this.doctors = new Map();
        this.nurses = new Map();
        this.surgeons = new Map();
        this.janitors = new Map();
        this.receptionists = new Map();
        this.patients = [];
        this.bloodPool = 0;
        this.dirtyness = 0;
        this.generateHospitalStaff(employeeSalaries, employeeCounts);
        this.generatePatients(minPatients, maxPatients);
    }

    cleanHospital(cleanPower) {
        ((this.dirtyness - cleanPower) <= 0) ?
            this.dirtyness = 0 :
            this.dirtyness -= cleanPower
    }

    getBudget() {
        let employees = [this.doctors, this.nurses, this.surgeons, this.janitors, this.receptionists]
        let salaryTotal = 0;
        employees.forEach(employeeColl => {
            employeeColl.forEach(employee => {
                salaryTotal += employee.salary;
            });
        });
        return salaryTotal;
    }

    getPatients() {
        let patientArr = [];
        this.nurses.forEach(nurse => {
            nurse.patients.forEach(patient => {
                patientArr.push(patient)
            })
        })
        return patientArr;
    }

    addBloodToPool(blood) {
        this.bloodPool += blood;
    }

    generateHospitalStaff(employeeSalaries, employeeCounts) {
        for (let key in employeeCounts) {
            let employeeType = key;
            for (let i = 0; i < employeeCounts[key]; i++) {
                let randomName = randomNamesArr[this.runningId];
                (employeeType === 'Doctor') ? 
                    this.doctors.set(this.runningId, new Doctor(randomName, this.runningId, employeeSalaries[employeeType])) : 
                (employeeType === 'Nurse') ? 
                    this.nurses.set(this.runningId, new Nurse(randomName, this.runningId, employeeSalaries[employeeType])) : 
                (employeeType === 'Surgeon') ? 
                    this.surgeons.set(this.runningId, new Surgeon(randomName, this.runningId, employeeSalaries[employeeType])) : 
                (employeeType === 'Receptionist') ? 
                    this.receptionists.set(this.runningId, new Receptionist(randomName, this.runningId, employeeSalaries[employeeType])) : 
                (employeeType === 'Janitor') ? 
                    this.janitors.set(this.runningId, new Janitor(randomName, this.runningId, employeeSalaries[employeeType])) : 
                        new Error("Error, a valid string of an Employee type must be passed!");
                this.runningId += 1;
            }
        }
    }

    generatePatients(minOfPatients, maxOfPatients) {
        let randomNumOfPatients = getRandomInt(minOfPatients, maxOfPatients);
        for (let i = 0; i <= randomNumOfPatients; i++) {
            let randomName = randomNamesArr[this.runningId];
            this.patients.push(new Patient(randomName, this.runningId));
            this.runningId += 1;
        }    
    }

    assignPatientsToNurses() {
        if (this.patients.length > 0) {
            let nurses = [...this.nurses.values()]
            let cycleCount = 0;
            this.patients.forEach(patient => {
                if (!(patient.isAssigned)) {
                    if (cycleCount >= nurses.length) {
                        cycleCount = 0;
                    }
                    nurses[cycleCount].assignPatient(patient);
                    cycleCount += 1;
                };
            });
        };
    };

    getAssignedPatientCount() {
        let currentPatients = 0;
        [...this.nurses.values()].forEach(nurse => {
            let nursePatientCount = nurse.patients.size;
            currentPatients += nursePatientCount;
        });
        return currentPatients;
    }
}

module.exports = Hospital;


