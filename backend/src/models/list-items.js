const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listItemSchema = new Schema({
    uuid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId(),
    },
    text: {
        type: String,
        required: true,
        unique: false,
        trim: true,     //remove leading and trailing whitespaces
        minlength: 3,
    },
    description: {
        type: String,
        required: false,
        unique: false,
        trim: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('ListItem', listItemSchema);