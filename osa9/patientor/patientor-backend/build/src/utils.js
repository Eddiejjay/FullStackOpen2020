"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const types_1 = require("./types");
const toNewPatient = ({ name, occupation, gender, ssn, dateOfBirth }) => {
    const newPatient = {
        name: parseName(name),
        occupation: parseOccupation(occupation),
        gender: parseGender(gender),
        ssn: parseSsn(ssn),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        entries: []
    };
    return newPatient;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth');
    }
    return dateOfBirth;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseDiagnosisCodes = (codes) => {
    if (!Object.values(codes).every(c => isString(c))) {
        throw new Error('Incorrect or missing diagnosis code values: ' + String(codes));
    }
    return codes;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + String(specialist));
    }
    return specialist;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + String(description));
    }
    return description;
};
const parseCriteria = (criteria) => {
    if (!criteria || !isString(criteria)) {
        throw new Error('Incorrect or missing criteria: ' + String(criteria));
    }
    return criteria;
};
const isDate = (date) => {
    if (!date || !isString(date)) {
        throw new Error('Incorrect or missing date ' + String(date));
    }
    return date;
};
const parseDate = (date) => {
    if (!date || !isString(date || !isDate(date))) {
        throw new Error('Incorrect or missing date: ' + String(date));
    }
    return String(date);
};
const parseSickLeave = ({ startDate, endDate }) => {
    if (!startDate || !endDate) {
        return;
    }
    if (!isString(startDate) || !isString(endDate)) {
        throw new Error('Incorrect or missing end or startDate: ' + String(endDate));
    }
    return { startDate, endDate };
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthRating = (rating) => {
    if (isNaN(rating) || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing health rating: ' + String(rating));
    }
    return rating;
};
const parseEmployerName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + String(name));
    }
    return name;
};
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
const toNewHospitalEntry = (object) => {
    const diagnosisCodes = object.diagnosisCodes
        ? parseDiagnosisCodes(object.diagnosisCodes)
        : undefined;
    return {
        date: parseDate(object.date),
        type: types_1.EntryType.Hospital,
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: diagnosisCodes,
        description: parseDescription(object.description),
        discharge: {
            date: parseDate(object.discharge.date),
            criteria: parseCriteria(object.discharge.criteria)
        }
    };
};
const toNewOccupationalHealthcareEntry = (object) => {
    const sickLeave = object.sickLeave
        ? parseSickLeave(object.sickLeave)
        : undefined;
    const diagnosisCodes = object.diagnosisCodes
        ? parseDiagnosisCodes(object.diagnosisCodes)
        : undefined;
    return {
        date: parseDate(object.date),
        type: types_1.EntryType.OccupationalHealthcare,
        specialist: parseSpecialist(object.specialist),
        employerName: parseEmployerName(object.employerName),
        diagnosisCodes: diagnosisCodes,
        description: parseDescription(object.description),
        sickLeave: sickLeave
    };
};
const toNewHealthCheckEntry = (object) => {
    return {
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        type: types_1.EntryType.HealthCheck,
        description: parseDescription(object.description),
        healthCheckRating: parseHealthRating(object.healthCheckRating),
    };
};
const toNewEntry = (object) => {
    const hospitalEntry = object;
    const healthcareEntry = object;
    const healthCheckEntry = object;
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
exports.toNewEntry = toNewEntry;
exports.default = toNewPatient;
