import express from 'express';
import {newPlace, getSinglePlace, deletePlace, getAllPlaces, updateSinglePlace} from '../controllers/placeController.js';
import { query } from 'express-validator';
import authenticatToken from "../midlewares/auth.js";
import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const placesRoutes = express.Router();

// GET All /places
placesRoutes.get('/', getAllPlaces)

// GET /places/:id
placesRoutes.get('/:id',  getSinglePlace)

// Save new place
placesRoutes.post('/', upload.single('image_url'), newPlace)

placesRoutes.put('/:id', authenticatToken, updateSinglePlace)

placesRoutes.delete('/:id', authenticatToken, deletePlace)

export default placesRoutes;