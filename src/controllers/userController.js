import mongoose from 'mongoose'
import userModel from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    
    const data = {
        _id: new mongoose.Types.ObjectId(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword
    }
    
    await userModel.create(data)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log("Error while saving user", err)
        })
}

const login = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) { 
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }
    try {
        const user = await userModel.findOne({ email: email})
        if ((user?.email === email) && bcrypt.compareSync(password, user?.password)) {
            const jwtToken = jwt.sign({email}, process.env.TOKEN_SECRET, {expiresIn:"1h"})
            res.status(200).json({
                jwtToken: jwtToken
            })
        }
    } catch (err) {
        throw new Error(err)
    }   
}

export {registerUser, login}