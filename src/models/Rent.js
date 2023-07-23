import mongoose, {Schema} from "mongoose";

const Rent = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    roomTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoomType"
    },
    price: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
})

const rentModel = mongoose.model('Rent', Rent);
export default rentModel