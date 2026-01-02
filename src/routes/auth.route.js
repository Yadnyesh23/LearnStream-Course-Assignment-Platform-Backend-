import Router from 'express';
import { registerUser , loginUser , logoutUser ,  regenerateRefreshToken} from '../controllers/auth.controller.js'

const router = Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/logout', logoutUser)

router.post('/refresh', regenerateRefreshToken)
export {router}