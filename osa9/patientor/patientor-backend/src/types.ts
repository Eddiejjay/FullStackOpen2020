export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }

  export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export type Entry =
    | OccupationalHelathCareEntry
    | HospitalEntry
    | HealthCheck
  ;

  export type NewEntry = Omit<Entry, 'id'>;
  
  export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[]
  }
  export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

  export type NewPatient = Omit<Patient, 'id'>;

  export type Fields = { name:unknown,
   occupation: unknown,
   gender: unknown,
   ssn?: unknown,
   dateOfBirth?: unknown
  };
interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
    description: string;
}
  export interface OccupationalHelathCareEntry extends BaseEntry {
    type: 'OccupationalHealthcare'
    employerName: string;
    sickLeave?:{
      startDate: string,
      endDate: string}

  }

  export  interface HospitalEntry extends BaseEntry{
  type: 'Hospital'
    discharge: {
      date: string;
      criteria: string;

    };
  }

  export interface HealthCheck extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;

}


  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

  export enum EntryType {
    Hospital = 'Hospital',
    OccupationalHealthcare = 'OccupationalHealthcare',
    HealthCheck = 'HealthCheck'
  }

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type NewOccupationalHealthcareEntry = Omit<OccupationalHelathCareEntry , 'id'>;

export type NewHealthCheckEntry = Omit<HealthCheck, 'id'>;
