import express from 'express';
import { createRuas, deleteRuas, getRuas, getRuasOne, updateRuas } from '../../controllers/RuasController.js';
import { VerifyToken } from '../../middleware/VerifyToken.js';

const router = express.Router()

router.use(VerifyToken)
router.post('/ruas', getRuas)
router.post('/ruas-one', getRuasOne)
router.post('/create-ruas', createRuas)
router.post('/update-ruas', updateRuas)
router.post('/delete-ruas', deleteRuas)

export default router