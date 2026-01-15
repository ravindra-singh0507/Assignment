import express from 'express';
import { submitForm, getSubmissions } from '../controllers/submissionController.js';

const router = express.Router();

router.post('/forms/:formId/submit', submitForm);
router.get('/forms/:formId/submissions', getSubmissions);

export default router;
