import express from 'express';

import { getSchedules, createSchedule, updateSchedule, deleteSchedule, fetchCollectorSchedules, fetchStreetOfDay, getSchedule, getStreetSchedule } from '../controllers/schedule.controller.js';

const router = express.Router()

router.get('/', getSchedules)
router.get('/:id', getSchedule)
router.post('/', createSchedule)
router.patch('/:id', updateSchedule)
router.delete('/:id', deleteSchedule)
router.post('/streetSchedule', getStreetSchedule)
router.get('/collectorSchedules/:id', fetchCollectorSchedules)
router.get('/streetDay/:day', fetchStreetOfDay)

export default router;