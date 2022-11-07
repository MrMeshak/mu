import express from 'express';
import * as authController from './authController';

const router = express.Router();

//login Route
router.post('/login', authController.login);

//Signup Route
router.post('/signup', authController.signup);

//logout Route
router.post('/logout', authController.logout);

export default router;
