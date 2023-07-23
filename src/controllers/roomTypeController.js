import mongoose from 'mongoose';
import RoomType from '../models/RoomType.js'

const newRoomType = async (req, res) => {
    const {name, description, price} = req.body;
    
    try {
        const room = await RoomType.findOne({name: req.body.name}).exec()
        if (room) {
           return res.status(500).json({ error: `Room type ${name} already exists`});
        }
        
        const data = {
            name: name,
            description: description,
            price: price,
            _id: new mongoose.Types.ObjectId()
        }
        
        await RoomType.create(data)

        res.status(200).json(data)
            
    } catch (err) {
        console.error("Unable to create new room type: " + err.message);
        res.status(500).json({ error: "Unable to create new room type " });
    }
}

const getSingleRoomType = async (req, res) => {
    const roomId = req.params.roomId

    await RoomType.findById(roomId)
        .then((roomType)=> {
            if (!roomType) {
                return res.status(404).json({
                    message: "Room type not found"
                })
            }

            res.status(200).json({
                message: roomType
            })
        })
        .catch((err) => {
            console.error("Unable to find room type: " + err.message);
            res.status(500).json({ error: "Unable to find room type " });
        })
}

const findAnyRoomType = async (req, res) => {
    const key = req.params.key
    const value = req.params.value
    const roomType = await RoomType.find({[key]: value}).exec();

    if (!roomType) {
        return res.status(404).json({message: "Room type not found"})
    }
    return res.status(200).json(roomType)

}

const getAllRoomTypes = async(req, res) => {
    await RoomType.find()
        .then((roomTypes) => {
            if (roomTypes.length < 1) {
                return res.status(404).json({message: "No data has been found"})
            }

            return res.status(200).json(roomTypes)
        })
        .catch((err) => {

        })
}

// TODO: Add delete method for RoomType
const deletedRoomTypes = async(req, res) => {}

export {newRoomType, getSingleRoomType, findAnyRoomType, getAllRoomTypes}