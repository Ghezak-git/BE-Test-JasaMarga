import express from 'express';
import { ImportUser } from '../../controllers/ImportController.js';

const router = express.Router()

router.get('/import-user', ImportUser);

export default router