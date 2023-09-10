import mongoose, { Schema } from 'mongoose';

const placeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        length: 100,
        required: [true, "Title is a required field"] 
    },
    description: { 
        type: String, 
        required: [true, "Description is a required field"] 
    },
    image_url: {
        type: String 
    },
    city: { 
        type: String, 
        required: [true, "City is a required field"] 
    },
    country: { 
        type: String, 
        required: [true, "Country is a required field"]  
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }],
    address: { 
        type: String, 
        required: [true, "Address is a required field"]
    },  
    refundable: {
        type: Boolean, 
        default: false
    },
    payLater: {
        type: Boolean, 
        default: false
    },
    signupDiscount: {
        type: Boolean,
        default: false
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