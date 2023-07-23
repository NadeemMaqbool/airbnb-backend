import mongoose from "mongoose"

const Room = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: {
        type: String,
        required: true,
    },
    floor: {
        type: Number,
    },
    hotelId: {
        // relationship with Place 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
    },
    roomTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoomType",
        required: true
    },
    capacity: {
        type: Number
    }
})

const roomModel = mongoose.model('Room', Room)

export default roomModel