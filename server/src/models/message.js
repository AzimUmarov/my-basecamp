const { Schema, model, Types} = require('mongoose');

const messageSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    creator_id: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    discussion_id: {
        type: Schema.Types.ObjectId,
        ref: 'Discussion',
        required: true,
    }
})

module.exports = model('Message', messageSchema);
