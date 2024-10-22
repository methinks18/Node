require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute'); // Correct import path
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount the productRoute middleware
app.use('/api/products', productRoute);

// Example of other routes or middleware
// app.get('/', (req, res) => {
//     res.send('Hello from the server!');
// });

app.use(errorMiddleware);
// Connect to MongoDB and start server
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Node API app is running on port ${PORT}`);
        });
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error);
    });
