import mongoose, { Schema } from 'mongoose';

const placeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        length: 100,
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image_url: {
        type: String 
    },
    city: { 
        type: String, 
        required: true 
    },
    country: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Place = mongoose.model('Place', placeSchema);

export default Place;