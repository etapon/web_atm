import express from 'express';

import { getBarangays } from '../controllers/barangay.controller.js'
// import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement, likeAnnouncement} from '../controllers/announcement.controller.js';
const router = express.Router();

router.get('/', getBarangays);
export default router;
