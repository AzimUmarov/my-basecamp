const { Schema, model } = require('mongoose');

const subTaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    }
});

module.exports = model('SubTask', subTaskSchema);
