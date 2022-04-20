import express from 'express';

import { getComplaints, createComplaint, updateComplaint, deleteComplaint, getComplaintsForResident, seenComplaint } from '../controllers/complaint.controller.js';

import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/seenComplaint/:id', seenComplaint)
router.get('/', getComplaints)
router.post('/',createComplaint)
router.patch('/:id', updateComplaint)
router.delete('/:id', deleteComplaint)
router.get('/:id', getComplaintsForResident)

export default router;