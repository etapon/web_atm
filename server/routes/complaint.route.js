import express from 'express';

import { getComplaints, createComplaint, updateComplaint, deleteComplaint, getComplaintsForResident } from '../controllers/complaint.controller.js';

import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getComplaints)
router.post('/',createComplaint)
router.patch('/:id', updateComplaint)
router.delete('/:id', deleteComplaint)
router.get('/:id', getComplaintsForResident)

// router.get('/', getAnnouncements);
// router.get('/plain', getPlainAnnouncements)
// router.post('/', createAnnouncement);
// router.patch('/:id', updateAnnouncement);
// router.delete('/:id', deleteAnnouncement);
// router.get('/search', getAnnouncementsBySearch);

export default router;