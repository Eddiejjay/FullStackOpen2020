import patientsData from '../../data/patients';
import { NewPatient, Patient } from '../types';
import {v1 as uuid} from 'uuid';


const patients: Array<Patient> = patientsData;

const getPatients = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({id, name, dateOfBirth,gender, occupation, entries }) =>  ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));

};
const getPatientById = (id: string) : Patient|undefined => {
    const patient = patients.find(p => p.id === id);
    console.log('patient', patient);
    return patient;



};

const addPatient = (patient: NewPatient) => {

    const newPatient = {
    id: uuid(),
    ...patient
};
patients.push(newPatient);
return newPatient;

};

export default {
    getPatients,
    addPatient,
    getPatientById
};

