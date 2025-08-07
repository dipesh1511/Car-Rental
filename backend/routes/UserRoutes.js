import express from 'express'
import {registerUser,loginUser,getUserData,getCars} from '../controllers/UserController.js'
import { protect } from '../middleware/auth.js';


const userRouter = express.Router();

// Define routes for user registration and login
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect,getUserData)
userRouter.get('/cars',getCars)
export default userRouter;