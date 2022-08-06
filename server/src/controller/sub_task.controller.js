const subTaskModel = require('../models/subtask');

class Task {
    async getAll(req, res) {
        try {
            const subTasks = await subTaskModel.find({
                task: req.params.id
            });
            return res.status(200).json(subTasks);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async create(req, res) {
        try {
            const subTask = new subTaskModel({
                title: req.body.title,
                task: req.params.id
            });

            subTask.save();
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async delete(req, res) {
        try {
            await subTaskModel.findByIdAndDelete(req.params.id);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
}

module.exports = new Task();
