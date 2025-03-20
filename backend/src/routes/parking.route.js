import express from 'express';
import { handleEntry, handleExit, checkParkingStatus } from '../controllers/parking.controller.js';
import protectedRoute from '../middlewire/auth.middlewire.js';

const router = express.Router();

router.post('/entry', protectedRoute, handleEntry);
router.post('/exit', protectedRoute, handleExit);
router.post('/status', protectedRoute, checkParkingStatus);

export default router;
