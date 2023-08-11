import mongoose from 'mongoose'
import userModel from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    const {first_name, last_name, email, password, confirm_password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    
    const data = {
        _id: new mongoose.Types.ObjectId(),
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword
    }
    
    if (!email || !password) {
        return res.status(400).json({error: "Both email and password are required"})
    }

    const user = await userModel.findOne({ email: email})
    if (user && user.email) {
        return res.status(400).json({error: "Email is already in use"})
    }

    await userModel.create(data)
        .then((user) => {
            const token = jwt.sign({email}, process.env.TOKEN_SECRET, {expiresIn:"1h"})
            res.status(200).json({email, token})
        })
        .catch(err => {
            console.log("Error while saving user", err)
            return res.status(400).json({error: "Could not save user due to error: " + err.message})
        })
}

const login = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) { 
        return res.status(401).json({
            error: "Eihter email or password is wrong"
        })
    }

    try {
        const user = await userModel.findOne({ email: email})
        
        if (!user) {
            return res.status(400).json({error: "Unable to find the record for user"})
        }

        if (
            !((user?.email === email) && bcrypt.compareSync(password, user?.password))
        ) {
            return res.status(401).json({
                error: "Eihter email or password is wrong"
            })    
        }

        const jwtToken = jwt.sign({email}, process.env.TOKEN_SECRET, {expiresIn:"1h"})
        return res.status(200).json({
            email:user.email, token: jwtToken
        })
        
    } catch (err) {
        return res.status(400).json({error: err.message})
    }   
}

const getUser = async (req, res) => {
    const userId = req.params.id

    const user = await userModel.findOne({_id:userId});

    res.status(200).json({
        user
    })
}

const getAllUsers = async (req, res) => {
   try {
        const users = await userModel.find()

        res.status(200).json(users)
   } catch (err) {
        console.error(err.message)
        res.status(400).json({error: "Unable to retrieve users, "})
   }
    
}

export {registerUser, login, getUser, getAllUsers}