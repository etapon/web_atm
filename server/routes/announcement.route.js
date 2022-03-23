import express from 'express';

import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement, getPlainAnnouncements, getAnnouncementsBySearch} from '../controllers/announcement.controller.js';

import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAnnouncements);
router.get('/plain', getPlainAnnouncements)
router.post('/', createAnnouncement);
router.patch('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);
router.get('/search', getAnnouncementsBySearch);

export default router;