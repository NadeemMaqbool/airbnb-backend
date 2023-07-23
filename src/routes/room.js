import express from 'express';
import {createRoom, getRoomUsingHotelId} from '../controllers/roomController.js'
const roomRouter = express.Router()

roomRouter.post('/', createRoom)

roomRouter.get('/:hotelId', getRoomUsingHotelId)

export default roomRouter