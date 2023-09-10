import mongoose from 'mongoose';

const HotelAmenity = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hotelId: {
        type: String,
        required: true
    },
    amenityId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

const HotelAmenityModel = mongoose.model('HotelAmenity', HotelAmenity);

export default HotelAmenityModel
