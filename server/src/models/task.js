const { Schema, model, Types} = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    subtasks: [{
        type: Types.ObjectId,
        ref: 'SubTask'
    }]
});

module.exports = model('Task', taskSchema);
