import express from 'express';
import authenticatToken from '../midlewares/auth.js';
import { newRoomType, getSingleRoomType, findAnyRoomType, getAllRoomTypes } from '../controllers/roomTypeController.js';
const roomTypeObj = express.Router()

roomTypeObj.get('/', authenticatToken, getAllRoomTypes);
roomTypeObj.post('/', newRoomType);
roomTypeObj.get('/:roomId', authenticatToken, getSingleRoomType);
roomTypeObj.get('/:key/:value', authenticatToken, findAnyRoomType);

export default roomTypeObj;