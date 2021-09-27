"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatients());
    console.log('fetching diafnoses');
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.getPatientById(req.params.id);
    if (patient)
        res.send(patient);
    else {
        res.status(404);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.default)(req.body);
        console.log('newpatient', newPatient);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
        console.log('post patients');
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
