import mongoose, {Schema} from "mongoose";

const roomTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        length: 50,
        unique: true
    },
    description: {
        type: String,
        length: 100,
    },
    price: {
        type: String,
        required: true
    }
})

const RoomType = mongoose.model('RoomType', roomTypeSchema);

export default RoomType