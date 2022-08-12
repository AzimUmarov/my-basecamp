const taskModel = require('../models/task');

class Task {
    async getAll(req, res) {
        try {
            const tasks = await taskModel.find({
                project: req.params.id
            });
            return res.status(200).json(tasks);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async getOne(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(404).json({ message: "Please provide a valid id" });
            }
            const task = await taskModel.findById(id);
            return res.status(200).json(task);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async create(req, res) {
        try {
            const task = new taskModel({
                title: req.body.title,
                project: req.params.id
            });
            await task.save();
            return res.status(200).json(task);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async update(req, res) {
        try {
            await  taskModel.findByIdAndUpdate(req.params.id, { title: req.body.title, isFinished: req.body.isFinished});
            return res.status(200).json({message: "Successfully updated"});
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async delete(req, res) {
        try {
            await taskModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({message: "Successfully deleted"});
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
}

module.exports = new Task();
