const { Schema, model } = require('mongoose');

const attachment = new Schema({
    type: {
        type: String
    },
    data: {
        type: String,
        required: true
    }
});

module.exports = model('Attachment', attachment);
