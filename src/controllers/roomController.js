import mongoose from 'mongoose'
import roomModel from '../models/room.js'

const createRoom = async (req, res) => {
    const data = {
        _id: new mongoose.Types.ObjectId(),
        number: req.body.roomNumber,
        hotelId: req.body.hotelId,
        roomTypeId: req.body.roomTypeId,
        capacity: req.body.capacity,
        floor: req.body.floorNumber        
    }

    try {
        await roomModel.create(data)
            .then((room) => {
                if (!room) {
                    return res.status(500).json({
                        error: 'Room creation failed due to some errror'
                    })
                }
                return res.status(200).json(room)
            })
    } catch (err) {
        console.log(err)    
        return res.status(500).json({
            error: 'Unable to create a room, check logs for errors'
        })
    }


}

const getRoomUsingHotelId = async (req, res) => {
    const hotelId = req.params.hotelId

    await roomModel.find({hotelId: hotelId})
        .then((place) => {
            res.status(200).json(place)
        })
        .catch(err => 
        {
            console.log(err.message)
            res.status(500).json({
                message: "Unbale to find room, please check logs for errors"
            }) 
        })
}

export {createRoom, getRoomUsingHotelId}
