import { NewPatient, Fields, Gender } from './types';


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

  export default toNewPatient;