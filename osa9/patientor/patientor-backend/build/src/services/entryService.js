"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEntry = void 0;
const patientService_1 = __importDefault(require("./patientService"));
const uuid_1 = require("uuid");
const addEntry = (id, entryToAdd) => {
    console.log('entryToadd', entryToAdd);
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entryToAdd);
    const patientToUpdate = patientService_1.default.getPatientById(id);
    console.log('patientToUpdate', patientToUpdate);
    if (patientToUpdate) {
        patientToUpdate.entries.push(newEntry);
    }
    else {
        throw new Error(`Patient not found by id: ${id}`);
    }
    return newEntry;
};
exports.addEntry = addEntry;
exports.default = {
    addEntry: exports.addEntry
};
