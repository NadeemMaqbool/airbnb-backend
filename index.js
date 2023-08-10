import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import compression from 'compression';
import http from 'http';
import placesRoutes from './src/routes/places.js';
import usersRoutes from './src/routes/user.js';
import roomType from './src/routes/roomType.js';
import rent from './src/routes/rent.js';
import room from './src/routes/room.js';
import bookings from './src/routes/bookings.js';
import amenities from "./src/routes/amenities.js";
import search from "./src/routes/search.js";
import {config} from "dotenv";
import { connectDb } from './src/utils/database.js';

config();

connectDb();

const app = express();
const PORT = process.env.PORT || 8080;

/* middlewares */
app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'POST, GET, PUT, DELETE, OPTIONS');

    next();
});

/* All Routes */
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/room-types', roomType)
app.use('/api/rent', rent)
app.use('/api/room', room)
app.use('/api/booking', bookings)
app.use('/api/amenities', amenities)

app.use('/api/search', search);

/** error handling */
app.use((error, req, res, next) => {
    if (res.headersSent) return next(error)
    console.log("Here is the error ", error.message)
    res.status(error.status || 500)
        .json({ error: error.message || 'An unknown error occurred.'});
});

http.createServer(app).listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});