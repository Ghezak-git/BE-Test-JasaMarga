import express from 'express'
import { Login, RefreshToken, Register } from '../../controllers/AuthController.js'

const router = express.Router()

router.post('/login', Login)
router.get('/refresh-token', RefreshToken)
router.post('/register', Register)

export default router