import { Error } from "mongoose";
import placeModel from "../models/Place.js"
import mongoose from "mongoose";
import {validationResult } from 'express-validator';

// save place in db
const newPlace = async (req, res) => {
    // const newPlaceValidationResult = validationResult(req)
    // console.log(newPlaceValidationResult)
    // if (!newPlaceValidationResult.isEmpty()) {
    //     return res.send({
    //         errors: newPlaceValidationResult.array()
    //     })
    // }
    const data = {
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.imgUrl,
        city: req.body.city,
        country: req.body.country,
        address: req.body.address
    }       

    try {
        await placeModel.create(data);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json(data);
        console.log(error)
    }
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
        .catch(error => {
            throw new Error(error)
        });
    } catch(error) {
        res.status(500).json({message: 'Error removing the specified place'})
        console.error(error)
    }
}

// get single place by id
const getSinglePlace = async (req, res) => {
    try {
        const placeId = req.params.id
        
        await placeModel.findById(placeId)
        .then((place) => {
            res.status(200).json(place)
        })
    } catch(error) {
        res.status(500).json({
            message: 'Error while retrieving the specified place'
        })
    }
} 

const getAllPlaces = async (req, res) => {
    try {
        await placeModel.find()
        .then((places) => {
            res.status(200).json(places)
        })
    } catch(error) {
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
        image_url: req.body.imgUrl,
        city: req.body.city,
        country: req.body.country,
        address: req.body.address
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