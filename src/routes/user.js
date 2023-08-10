import express from "express";
import { registerUser, login, getUser } from "../controllers/userController.js";
import AuthMiddleware from "../midlewares/auth.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser)

userRouter.post('/login', login)

userRouter.get('/:id', AuthMiddleware, getUser)

export default userRouter