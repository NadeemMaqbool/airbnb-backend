import { MongoTopologyClosedError } from 'mongodb';
import mongoose from 'mongoose';
import { Mongoose } from 'mongoose';

const amenities = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        length: 50,
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
        required: true
    }
});

const amenityModel = new mongoose.model('Amenity',amenities);

export default amenityModel