/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NewPatient, Fields, Gender, NewEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, NewHealthCheckEntry, HealthCheckRating, EntryType } from './types';


const toNewPatient = ({ name, occupation, gender, ssn, dateOfBirth}: Fields): NewPatient => {
  const newPatient: NewPatient = {
      name: parseName(name),
      occupation: parseOccupation(occupation),
      gender: parseGender(gender),
      ssn: parseSsn(ssn),
      dateOfBirth: parseDateOfBirth(dateOfBirth),
      entries:[]

  };

  return newPatient;
};


const parseName = (name: unknown): string => {
    if (!name|| !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!occupation|| !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
  
    return occupation;
  };

  const parseSsn = (ssn: unknown): string => {
    if (!ssn|| !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
  
    return ssn;
  };

  const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth|| !isString(dateOfBirth)) {
      throw new Error('Incorrect or missing dateOfBirth');
    }
  
    return dateOfBirth;
  };







const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseGender = (gender: unknown): Gender => {
      if(!gender|| !isGender(gender) ){
        throw new Error('Incorrect or missing gender');
      }
      return gender;
    };


const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

  const parseDiagnosisCodes = (codes: any) => {
    if (!Object.values(codes).every(c => isString(c))) {
      throw new Error('Incorrect or missing diagnosis code values: ' + String(codes));
    }
    return codes as Array<string>;
  };

  const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
      throw new Error('Incorrect or missing specialist: ' + String(specialist));
    }
    return specialist;
  };
  
  const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
      throw new Error('Incorrect or missing description: ' + String(description));
    }
    return description;
  };

  const parseCriteria = (criteria: any): string => {
    if (!criteria || !isString(criteria)) {
      throw new Error('Incorrect or missing criteria: ' + String(criteria));
    }
    return criteria;
  };
  const isDate = (date: any): string => {
    if (!date || !isString(date)) {
      throw new Error('Incorrect or missing date ' + String(date));
    }
    return date;
  };

  const parseDate = (date: any): string => {
    if (!date || !isString(date || !isDate(date))) {
      throw new Error('Incorrect or missing date: ' + String(date));
    }
    return String(date);
  };

  const parseSickLeave = ({ startDate, endDate }: any) => {
    if (!startDate || !endDate) {
      return;
    }
    if (!isString(startDate) || !isString(endDate)) {
      throw new Error('Incorrect or missing end or startDate: ' + String(endDate));
    }
    return { startDate, endDate };
  };

  const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
  };

  const parseHealthRating = (rating: any): HealthCheckRating => {
    if (isNaN(rating) || !isHealthCheckRating(rating)) {
      throw new Error('Incorrect or missing health rating: ' + String(rating));
    }
    return rating;
  };

  const parseEmployerName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' + String(name));
    }
    return name;
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const toNewHospitalEntry = (object: NewHospitalEntry): NewHospitalEntry => {
    const diagnosisCodes = object.diagnosisCodes 
      ? parseDiagnosisCodes(object.diagnosisCodes)
      : undefined;
    return {
      date: parseDate(object.date),
      type: EntryType.Hospital,
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: diagnosisCodes,
      description: parseDescription(object.description),
      discharge: {
        date: parseDate(object.discharge.date),
        criteria: parseCriteria(object.discharge.criteria)
      }
    };
  };
  

  const toNewOccupationalHealthcareEntry = (
    object: NewOccupationalHealthcareEntry
    ): NewOccupationalHealthcareEntry => {
  
    const sickLeave = object.sickLeave 
      ? parseSickLeave(object.sickLeave)
      : undefined;
    const diagnosisCodes = object.diagnosisCodes 
      ? parseDiagnosisCodes(object.diagnosisCodes)
      : undefined;
      
    return {
        date: parseDate(object.date),
        type: EntryType.OccupationalHealthcare,
        specialist: parseSpecialist(object.specialist),
        employerName: parseEmployerName(object.employerName),
        diagnosisCodes: diagnosisCodes,
        description: parseDescription(object.description),
        sickLeave: sickLeave
    };
  };

  const toNewHealthCheckEntry = (object: NewHealthCheckEntry): NewHealthCheckEntry => {
    return {
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: EntryType.HealthCheck,
      description: parseDescription(object.description),
      healthCheckRating: parseHealthRating(object.healthCheckRating),
    };
  };

  export const toNewEntry = (object: NewEntry): NewEntry => {
    const hospitalEntry = object as NewHospitalEntry;
    const healthcareEntry = object as NewOccupationalHealthcareEntry;
    const healthCheckEntry = object as NewHealthCheckEntry;
  
    switch (object.type) {
      case 'Hospital':
        return toNewHospitalEntry(hospitalEntry);
      case 'OccupationalHealthcare':
        return toNewOccupationalHealthcareEntry(healthcareEntry);
      case 'HealthCheck':
        return toNewHealthCheckEntry(healthCheckEntry);
      default:
        return assertNever(object.type);
    }
  };

  export default toNewPatient;