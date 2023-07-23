import mongoose from 'mongoose';
import Amenity from "../models/Amenity.js"

const create = async (req, res) => {
    const data = {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        hotel: req.body.hotelId
    }

    await Amenity.create(data)
        .then((amenity) => {
            if (amenity) {
                res.status(200).json(amenity)
            }
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json("Error while creating the new amenity, please check logs for errors.")
        });
}

const getAll = async (req, res) => {
    await Amenity.find()
        .then((amenities) => {
            if (amenities.length>0) {
                res.status(200).json(amenities)
            }
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json("Error while getting all amenities, please check logs for errors")
        });
}

export {create, getAll}