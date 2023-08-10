import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookingObj from '../models/Booking.js'
import placeObj from '../models/Place.js'
import roomObj from "../models/room.js"
dotenv.config()


const searchItems = async (req, res) => {
    const {location, checkIn, checkOut, guests, rooms } = req.body
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    

    const coveredOutside = { checkIn: { $lte: checkInDate },checkOut: { $gte: checkOutDate }}
    const coveredInside = { checkIn: { $gte: checkInDate },checkOut: { $lte: checkOutDate }}
    const checkInOverlapped = {checkIn: { $lte: checkInDate }, checkOut: { $gt: checkInDate, $lte: checkOutDate }}
    const checkOutOverlapped = {checkIn: { $gte: checkInDate, $lte: checkOutDate },checkOut: { $gte: checkOutDate }}
    
    try {
        const places = await placeObj.find({city: location})
        
            if (!places && places.length === 0) {
                console.error(places)
                return res.status(404).json({message: 'Record not found'})
            }

            const foundPlaces = []
            
            for (const place of places) {
                const bookings = await bookingObj.find({
                    hotelId: place._id,
                    $or: [coveredOutside, coveredInside, checkInOverlapped, checkOutOverlapped ]
                })

                if (bookings.length === 0) {
                    const record = await getSinglePlace(place._id)
                    foundPlaces.push(record[0])
                }
            }
            
            return res.status(200).json(foundPlaces)
        } catch (err) {
            console.error(err);
        }
}

const getSinglePlace = async (placeId) => {
    const location = await placeObj.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(placeId) },
        },
        {
            $lookup: {
                from: 'amenities',
                localField: '_id',
                foreignField: 'hotel',
                as: 'amenities'
            },
        }
    ])

    const roomData = await roomObj.find({hotelId: placeId})
        .populate('roomTypeId')
        .exec()
            
        if (roomData?.length > 0) {
            location[0].rooms_data = roomData
            console.log("Location",location)
            return location
        }   
        
        return location
    
}

export {searchItems};