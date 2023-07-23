import express from "express"
import authenticatToken from '../midlewares/auth.js'
import { createRent } from '../controllers/rentController.js'

const rentRoute = express.Router()

rentRoute.post('/',createRent)

export default rentRoute