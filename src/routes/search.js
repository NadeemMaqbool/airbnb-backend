import express from 'express';
import {searchItems} from '../controllers/searchController.js'

const search = express.Router()

search.post('/place', searchItems)

export default search