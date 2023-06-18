const express = require('express');
const router = express.Router();

const ListItem = require('../models/list-items');

// GET request to retrieve all list items
router.route('').get((req, res) => {
    ListItem.find()
        .then((listItems) => res.json(listItems))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

// POST request to add a new list item
router.route('/add').post((req, res) => {
    const text = req.body.text;
    const description = req.body.description;

    const newListItem = new ListItem({
        text,
        description,
    });

    newListItem.save()
        .then(() => res.json('New list item added'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;