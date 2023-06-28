import express from 'express';
import bodyParser from 'body-parser';
//import mongoose from 'mongoose';
import cors from 'cors';
import compression from 'compression';
import http from 'http';
import placesRoutes from './src/routes/places.js';
import usersRoutes from './src/routes/user.js';
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

/* middlewares */
app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'POST, GET, PUT, DELETE, OPTIONS');

    next();
});

/* Places Routes */
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);
/** error handling */
app.use((error, req, res, next) => {
    if (res.headersSent) return next(error)
    console.log("Here is the error ", error.message)
    res.status(error.status || 500)
        .json({ error: error.message || 'An unknown error occurred.'});
});


/* connect to mongodb */
const dbConnect = (async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Db connected successfully")
    } catch (error) {
        throw error
    }
})



http.createServer(app).listen(PORT, () => {
    dbConnect();
    console.log(`Server started at port ${PORT}`);
});