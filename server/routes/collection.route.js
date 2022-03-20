import express from 'express';
import { getBiodegradable, createCollection, getBiodegradableThisMonth, getCollections, getNonBiodegradableThisMonth, getRecyclableThisMonth, getNonBiodegradable, getRecyclable } from '../controllers/collection.controller.js';

const router = express.Router()

router.get('/', getCollections)
router.post('/', createCollection)

router.get('/getBiodegradableThisMonth', getBiodegradableThisMonth)
router.get('/getNonBiodegradableThisMonth', getNonBiodegradableThisMonth)
router.get('/getRecyclableThisMonth', getRecyclableThisMonth)

router.get('/getBiodegradable', getBiodegradable)
router.get('/getNonBiodegradable', getNonBiodegradable)
router.get('/getRecyclable', getRecyclable)

export default router;