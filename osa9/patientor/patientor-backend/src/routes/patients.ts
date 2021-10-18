

import express from 'express';
import  patientService from '../services/patientService';
import  toNewPatient, { toNewEntry }  from '../utils';
import entryService from '../services/entryService';
import { NewEntry } from '../types';

const router = express.Router();



router.get('/', (_req, res) => {

res.send(patientService.getPatients());
console.log('fetching diafnoses');

});

router.get('/:id', (req, res) => {
const patient = patientService.getPatientById(req.params.id);
if (patient)
res.send(patient);
else {
  res.status(404);
}
  
  });


router.post('/', (req, res) => {
  try {
   const newPatient = toNewPatient(req.body);
   console.log('newpatient', newPatient);

   const addedPatient = patientService.addPatient(newPatient);
   res.json(addedPatient);
   console.log('post patients');
} catch (e:any) {
    res.status(400).send(e.message);
  }

});


router.post('/:id/entries', (req, res) => {
  try {
    console.log('perse');
  const id:string = req.params.id;
  const newEntry: NewEntry = toNewEntry(req.body);
  const addedEntry = entryService.addEntry(id, newEntry);

res.json(addedEntry);
} catch (e:any) {
  res.status(400).send(e.message);
}

});





export default router;

