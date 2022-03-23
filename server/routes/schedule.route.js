import express from 'express';

import { getSchedules, getAdminSchedules, createSchedule, updateSchedule, deleteSchedule, fetchCollectorSchedules, fetchStreetOfDay, getSchedule, getStreetSchedule, getSchedulesBySearch } from '../controllers/schedule.controller.js';

import auth from '../middleware/auth.middleware.js';

const router = express.Router()

router.get('/search', getSchedulesBySearch);
router.get('/adminSchedules', getAdminSchedules);
router.get('/:id', getSchedule);

router.get('/', getSchedules);
router.post('/', createSchedule);
router.patch('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);
router.post('/streetSchedule', getStreetSchedule);
router.get('/collectorSchedules/:id', fetchCollectorSchedules);
router.get('/streetDay/:day', fetchStreetOfDay);

export default router;