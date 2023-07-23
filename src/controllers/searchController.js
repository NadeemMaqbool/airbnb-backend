import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookingObj from '../models/Booking.js'
import placeObj from '../models/Place.js'

dotenv.config()


const searchItems = async (req, res) => {
    const {location, checkIn, checkOut, guests, rooms } = req.body
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    

    const coveredOutside = { checkIn: { $lte: checkInDate },checkOut: { $gte: checkOutDate }}
    const coveredInside = { checkIn: { $gte: checkInDate },checkOut: { $lte: checkOutDate }}
    const checkInOverlapped = {checkIn: { $lte: checkInDate }, checkOut: { $gt: checkInDate, $lte: checkOutDate }}
    const checkOutOverlapped = {checkIn: { $gte: checkInDate, $lte: checkOutDate },checkOut: { $gte: checkOutDate }}
    
    await placeObj.find({city: location})
        .then(async (places) => {
            if (!places && places.length === 0) {
                console.error(places)
                return res.status(404).json({message: 'Record not found'})
            }

            const foundPlaces = []
            
            for (const place of places) {
                
                await bookingObj.find({
                    hotelId: place._id,
                    $or: [coveredOutside, coveredInside, checkInOverlapped, checkOutOverlapped ]
                })
                .then(bookings => {
                    if (bookings.length === 0) {
                        console.log('Found Place', place)
                        foundPlaces.push(place) 
                    }
                }).catch(err => {
                    console.error(err);
                })

            }
            
            return res.status(200).json(foundPlaces)
        })
        .catch(err => {
            console.error(err);
        })
}

export {searchItems};