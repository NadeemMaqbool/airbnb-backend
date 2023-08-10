import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"

dotenv.config()

const secret = process.env.TOKEN_SECRET

const authenticatToken = async (req, res, next) => {
    const {authorization} = req.headers;
    const jwtToken = authorization.split(' ')[1]
    
    if (!jwtToken) {
        return res.status(403).send({
            error: "Unauthenticated access"
        })
    }

    try {
        const {_id} = jwt.verify(jwtToken, secret)
        req.user = await User.findOne({_id}).select('_id')

        next();
        
    } catch (err) {
        console.error(err)
        return res.status(401).json({
            error: "Authentication failed"
        })
    }
    
}

export default authenticatToken