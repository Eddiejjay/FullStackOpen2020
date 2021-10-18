"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importStar(require("../utils"));
const entryService_1 = __importDefault(require("../services/entryService"));
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
router.post('/:id/entries', (req, res) => {
    try {
        console.log('perse');
        const id = req.params.id;
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const addedEntry = entryService_1.default.addEntry(id, newEntry);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
