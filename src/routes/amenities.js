import express from 'express';
import { getAll, create } from '../controllers/AmenitiesController.js';
const amenityRouter = express.Router();

amenityRouter.post('/', create)

amenityRouter.get('/', getAll)

export default amenityRouter
