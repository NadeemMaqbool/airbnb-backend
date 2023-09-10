import HotelAmenityModel from "../models/HotelAmenity.js"
import Amenity from "../models/Amenity.js"

const hotelAmenitiesStore = async (amenities, hotelId) => {
    let newData = []; 
    for(const amenity of amenities) {
        const item = {
            hotelId: hotelId,
            amenityId: amenity
        }

        newData = [...newData, item]
    }
    
    const response = await HotelAmenityModel.insertMany(newData)
    
    return response
}

const getHotelAmenities = async (hotelId) => {
    const amenities = await HotelAmenityModel.find({ 'hotelId': hotelId });
    let amenitiesWithNames = [];
    
    await Promise.all(amenities.map(async (amenity) => {
        const name = await getAmenityById(amenity.amenityId);
        amenitiesWithNames.push(name)
    }))
    
    return amenitiesWithNames;
}

const getAmenityById = async (id) => {
    const amenity = await Amenity.findById({'_id': id})
    
    return amenity.name
}

export { hotelAmenitiesStore, getHotelAmenities, getAmenityById }