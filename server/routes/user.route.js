import express from 'express';

import { signin, signup, getUsers, updateUser, deleteUser, updateImage, updateCredentials,changePassword, getCollectors } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getUsers)
router.get('/collectors', getCollectors)
router.patch('/update', updateUser)
router.patch('/updateImage', updateImage)
router.patch('/delete', deleteUser)
router.patch ('/updateCredentials', updateCredentials)
router.patch('/changePassword', changePassword)


router.post('/signin', signin);
router.post('/signup', signup);
// router.post('/:token', activation)

export default router;