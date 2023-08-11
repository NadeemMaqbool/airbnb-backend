import express from "express";
import { registerUser, login, getUser, getAllUsers } from "../controllers/userController.js";
import AuthMiddleware from "../midlewares/auth.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser)

userRouter.post('/login', login)

userRouter.get('/:id', AuthMiddleware, getUser)

userRouter.get('/', getAllUsers)

export default userRouter