import express from 'express';

import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement, likeAnnouncement, getPlainAnnouncements} from '../controllers/announcement.controller.js';
const router = express.Router();

router.get('/', getAnnouncements);
router.get('/plain', getPlainAnnouncements)
router.post('/', createAnnouncement);
router.patch('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);
router.patch('/:id/likeAnnouncement', likeAnnouncement);
export default router;