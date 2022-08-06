const { Schema, model } = require('mongoose');

const attachment = new Schema({
    type: {
        type: String
    },
    data: {
        type: String,
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    }
});

module.exports = model('Attachment', attachment);
