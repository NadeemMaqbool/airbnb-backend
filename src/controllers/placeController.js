import placeModel from "../models/Place.js"
import roomObj from "../models/room.js"
import mongoose from "mongoose";
import {validationResult } from 'express-validator';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { hotelAmenitiesStore, getHotelAmenities, getAmenityById } from "../services/amenityServices.js"
import dotenv from "dotenv"

dotenv.config()

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

/*
    initialize the s3 client to perform operations like PUT and DELETE
*/
const s3Client = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});

// save place in db
const newPlace = async (req, res) => {
    const randomStringName = uuidv4()
    const amenities = JSON.parse(req.body.amenities)
    const data = {
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        city: req.body.city,
        country: req.body.country,
        address: req.body.address,
        image_url: randomStringName,
        refundable: req.body.refundable,
        payLater: req.body.payLater,
        signupDiscount: req.body.signupDiscount,
    }       
    const params = {
        Bucket: bucketName,
        Key: randomStringName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }

    const media = new PutObjectCommand(params)
    await s3Client.send(media)

    await placeModel.create(data)
        .then((place) => {
            if (amenities.length > 0) {
                hotelAmenitiesStore(amenities, place._id)
            }
            res.status(200).json(place);
        })
        .catch((error) => {
            console.log(error.errors)
            res.status(500).json({
                error: error.errors
            });
        })
}

const deletePlace = async (req, res) => {
    try {
        const placeId = req.params.id
        await placeModel.findByIdAndDelete(placeId)
        .then(() => {
            res.status(200).json({
                message: 'Place was successfully deleted'
            })
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message
            })
        });
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Error removing the specified place'})
    }
}

// get single place by id: Getting rooms by applying joins to rooms list
const getSinglePlace = async (req, res) => {
    try {
        const placeId = req.params.id
        await placeModel.aggregate([
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
        .then(async (place) => {
            const roomData = await roomObj.find({hotelId: placeId})
                .populate('roomTypeId')
                .exec()
            
            if (roomData.length > 0) {
                place[0].rooms_data = roomData
                return res.status(200).json(place)
            }    
            res.status(500).json(place)
        })
    } catch(error) {
        console.error(error)
        res.status(500).json({
            message: 'Error while retrieving the specified place'
        })
    }
} 

const getAllPlaces = async (req, res) => {
    try {
        let updatedPlaces = {};
        let page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        let skip = (page - 1) * limit
        const totalItems = await placeModel.countDocuments({}).exec()
        
        const places =  await placeModel
            .aggregate([
            {
                $sort: { created_at: -1 }
            },    
            // {
            //     $lookup: {
            //         from: 'hotelamenities',
            //         localField: '_id',
            //         foreignField: 'hotelId',
            //         as: 'amenities'
            //     },
            // },
            { $skip: skip },
            { $limit: limit}
            
        ])
        const promises = places.map(async (place) => {
            const rooms = await roomObj.find({hotelId: place._id})
                .populate('roomTypeId')
            
            place.imageUrl = null 

            if (uuidValidate(place.image_url)) {
                const params = {
                    Bucket: bucketName,
                    Key: place.image_url
                }
                const command = new GetObjectCommand(params)
                place.imageUrl = await getSignedUrl(s3Client, command, {expiresIn: 3600})
            }
            
            if (rooms.length > 0) {
                place.rooms_data = rooms.sort((a, b) => a.roomTypeId?.price - b.roomTypeId?.price);
                return place
            }  
            
            let hotelAmenities = await getHotelAmenities(place._id)
            
            place.rooms_data = []
            place.amenities = hotelAmenities
            return place
        })
        
        await Promise.all(promises).then((records) => {
            updatedPlaces.records = records
            updatedPlaces.total = totalItems

            return res.status(200).json(updatedPlaces)
        })
        .catch((err) => {
            return res.status(500).json({
                error: err.message
            })
        })
        
    } catch(error) {
        console.error(error)
        res.status(500).json({
            message: 'Error while retrieving the places'
        })
    }
}


const updateSinglePlace = async (req, res) => {
    const placeId = req.params.id
    const data = {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        city: req.body.city,
        country: req.body.country,
        address: req.body.address,
        refundable: req.body.refundable,
        payLater: req.body.payLater,
        signupDiscount: req.body.signupDiscount,
    }

    await placeModel.findByIdAndUpdate(placeId, data, {new: true})
    .then((record) => {
        res.status(200).json(record)
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message
        })
    });

}

export { newPlace, getSinglePlace, deletePlace, getAllPlaces, updateSinglePlace };