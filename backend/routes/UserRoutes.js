import express from 'express'
import { getUserData, loginUser, registerUser } from '../controllers/UserController.js';
import { protect } from '../middleware/auth.js';


const userRouter = express.Router();

// Define routes for user registration and login
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect,getUserData)

export default userRouter;