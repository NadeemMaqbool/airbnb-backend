import mongoose from 'mongoose';
import Rent from "../models/Rent.js"

const createRent = async (req, res) => {
    const data = {
        _id: new mongoose.Types.ObjectId(),
        roomTypeId: req.body.roomTypeId,
        price: req.body.price,
    }

    try {
        await Rent.create(data)
            .then((rent) => {
                if (!rent) {
                    return res.status(500).json({
                        error: 'Unable to create the record for rent'
                    })
                }
                
                return res.status(200).json(rent)
            }) 
    } catch (err) {
        return res.status(500).json({
            error: 'Error occurred while creating the record for rent'
        })
    }
}

export {createRent}