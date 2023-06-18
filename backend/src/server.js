const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGO_URI;

mongoose
    .connect(dbURI)
    .then(console.log('Successfully connected to MongoDB cluster'))
    .catch((err) => console.log(`Error while establishing connection with the database: ${err}`));

const listItemsRouter = require('./routes/li-routes');
app.use('/v1/list-items', listItemsRouter);

app.listen(
    port, () => {
        console.log(`Server is up and running on port: ${port}`);
    }
);
