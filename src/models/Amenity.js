import mongoose from 'mongoose';

const amenities = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        length: 50,
        required: true
    }
});

const amenityModel = new mongoose.model('Amenity',amenities);

export default amenityModel