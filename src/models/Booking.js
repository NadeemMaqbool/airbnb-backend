import mongoose from 'mongoose';

const bookingObj = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    totalBill: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'compensated'],
        default: 'pending'
    },
    guests: {
        type: Number,
        default: 1
    },
    rooms: {
        type: Number,
        default: 1
    }

})

const Booking = mongoose.model('Booking', bookingObj)
export default Booking