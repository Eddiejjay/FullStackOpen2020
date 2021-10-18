
import { Entry, NewEntry } from "../types";
import patientService from "./patientService";
import {v1 as uuid} from 'uuid';

export const addEntry = (id:string, entryToAdd: NewEntry ) => { 
console.log('entryToadd', entryToAdd);
    const newEntry = {
        id :  uuid(),
        ...entryToAdd
    } as Entry;

    const patientToUpdate = patientService.getPatientById(id);
    console.log('patientToUpdate', patientToUpdate);
    if (patientToUpdate) {
        patientToUpdate.entries.push(newEntry);
    } else {
        throw new Error (`Patient not found by id: ${id}`);
    }
return newEntry;
};


export default {
  addEntry
};
