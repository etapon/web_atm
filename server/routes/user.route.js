import express from 'express';

import { signin, signup, getUserCount, getUserStreets, getUsers, updateUser, deleteUser, updateImage, 
    updateCredentials,changePassword, getCollectors, getResidentCount, verifyUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/userCount', getUserCount)
router.get('/getResidentCount', getResidentCount)
router.get('/userStreets', getUserStreets)

router.get('/', getUsers)
router.get('/collectors', getCollectors)
router.patch('/update', updateUser)
router.patch('/updateImage', updateImage)
router.patch('/delete', deleteUser)
router.patch ('/updateCredentials', updateCredentials)
router.patch('/changePassword', changePassword)

router.post('/signin', signin);
router.post('/signup', signup);

router.get('/:id/verify/:token', verifyUser)

export default router;