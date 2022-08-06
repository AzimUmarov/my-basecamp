const { Schema, model, Types} = require('mongoose');

const discussionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    creator_id: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    messages: [{
        creator_id: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        body: {
            type: String,
            required: true
        }
    }]
})

module.exports = model('Discussion', discussionSchema);
