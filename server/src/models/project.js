const { Schema, model, Types } = require('mongoose');

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: { type: String },
    creator_id: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [
        {
            type: Object,
            user_id: {
                type: Types.ObjectId,
                ref: 'User',
            },
            email: { type: String, required: true },
            role: {
                type: String,
                enum: ['admin', 'user'],
                required: true
            },
            permissions: {
                type: Object,
                required: true,
                create: { type: Boolean, required: true },
                read: { type: Boolean, required: true },
                update: { type: Boolean, required: true },
                delete: { type: Boolean, required: true },
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    tasks: [{
        type: Types.ObjectId,
        ref: 'Task'
    }],
    discussion: [{
        type: Types.ObjectId,
        ref: 'Discussion'
    }],
    attachments: [{
        type: Types.ObjectId,
        ref: 'Attachment'
    }]
});

module.exports = model('Project', projectSchema);
