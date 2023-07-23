import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const SECRET_KEY = process.env.TOKEN_SECRET

const authenticatToken = (req, res, next) => {
    const jwtToken = req.headers?.authorization?.split(" ")[1];
    if (!jwtToken) {
        return res.status(403).send({
            message: "Unauthenticated access"
        })
    }
    
    jwt.verify(jwtToken, SECRET_KEY, (err, user) =>{
        if (err) {
            res.status(403).send({
                message: "Authentication failed"
            })
        }

        req.user = user
        next();
    })
}

export default authenticatToken