import express from 'express';
import { createCollection, getCollections,
    getBiodegradablesToday, getNonBiodegradablesToday, getRecyclablesToday,
    getTotalPerStreetToday, getBiodegradableDynamic, getBiodegradableThisMonth,
    getBiodegradablesThisYear, getBiodegradableSorted, getNonBiodegradableDynamic,
    getNonBiodegradableThisMonth, getNonBiodegradablesThisYear, getNonBiodegradableSorted,
    getRecyclableDynamic, getRecyclablesThisMonth, getRecyclablesThisYear, getRecyclableSorted, getCollectedToday,
    getCollectedThisMonth, getCollectedThisYear, getCollectedSorted, getCollectedWasteType, getCollectedTimeFrame,
    getBiodegradableTimeFrame, getNonBiodegradableTimeFrame, getRecyclableTimeFrame, getBiodegradableTodayReport,
    getNonBiodegradableTodayReport, getRecyclableTodayReport } from '../controllers/collection.controller.js';

const router = express.Router()

router.get('/', getCollections) 
router.post('/', createCollection)

router.get('/getBiodegradablesToday', getBiodegradablesToday)
router.get('/getNonBiodegradablesToday', getNonBiodegradablesToday)
router.get('/getRecyclablesToday', getRecyclablesToday)
router.get('/getTotalToday', getTotalPerStreetToday) 

router.post('/getBiodegradableDynamic', getBiodegradableDynamic)
router.get('/getBiodegradablesThisMonth', getBiodegradableThisMonth)
router.get('/getBiodegradablesThisYear', getBiodegradablesThisYear)
router.get('/getBiodegradableSorted', getBiodegradableSorted)

router.post('/getNonBiodegradableDynamic', getNonBiodegradableDynamic)
router.get('/getNonBiodegradablesThisMonth', getNonBiodegradableThisMonth)
router.get('/getNonBiodegradablesThisYear', getNonBiodegradablesThisYear)
router.get('/getNonBiodegradableSorted', getNonBiodegradableSorted)

router.post('/getRecyclableDynamic', getRecyclableDynamic)
router.get('/getRecyclablesThisMonth', getRecyclablesThisMonth)
router.get('/getRecyclablesThisYear', getRecyclablesThisYear)
router.get('/getRecyclableSorted', getRecyclableSorted)

router.get('/getCollectedToday', getCollectedToday)
router.get('/getCollectedThisMonth', getCollectedThisMonth)
router.get('/getCollectedThisYear', getCollectedThisYear)
router.get('/getCollectedSorted', getCollectedSorted)
router.post('/getCollectedWasteType', getCollectedWasteType)

router.post('/getCollectedTimeFrame', getCollectedTimeFrame)
router.post('/getBiodegradableTimeFrame', getBiodegradableTimeFrame)
router.post('/getNonBiodegradableTimeFrame', getNonBiodegradableTimeFrame)
router.post('/getRecyclableTimeFrame', getRecyclableTimeFrame)
// router.get('/getComparativeSorted', getComparativeSorted)

router.get('/getBiodegradableTodayReport', getBiodegradableTodayReport)
router.get('/getNonBiodegradableTodayReport', getNonBiodegradableTodayReport)
router.get('/getRecyclableTodayReport', getRecyclableTodayReport)
export default router;