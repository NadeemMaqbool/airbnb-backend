import mongooose from 'mongoose';
import Booking from '../models/Booking.js';
import mongoose from 'mongoose';

const createBooking = async (req, res) => {
    const {hotel, userId, checkIn, checkOut} = req.body
    // FIXME:  Search hotel by name and get the ID 
    const data = {
        _id: new mongoose.Types.ObjectId(),
        hotelId: hotel,
        userId: userId,
        checkIn: checkIn,
        checkOut: checkOut
    }

    await Booking.create(data)
        .then((booking) => {
            if (!booking) {
                return res.status(500).json({
                    error: 'Booking not found'
                })
            }

            return res.status(200).json(booking)
        })  
        .catch((error) => {
            console.log(error.message)
            return res.status(500).json({
                error: "Unable to create booking. please check logs for error."
            })
        })
    
}
export {createBooking}