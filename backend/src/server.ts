const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.listen(
    port, () => {
        console.log(`Server is up and running on port: ${port}`);
    }
);
