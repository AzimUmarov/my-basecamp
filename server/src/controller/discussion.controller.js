const discussionModel = require('../models/discussion');

class Discussion {
    async getAll(req, res) {
        try {
            const tasks = await discussionModel.find({
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
            const task = await discussionModel.findById(id);
            return res.status(200).json(task);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async create(req, res) {
        try {
            const { user } = req.body;
            const task = new discussionModel({
                title: req.body.title,
                project: req.params.id,
                creator_id: user._id
            });
            await task.save();
            return res.status(200).json(task);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async delete(req, res) {
        try {
            await discussionModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({message: "Successfully deleted"});
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async update(req, res) {
        try {
            await  discussionModel.findByIdAndUpdate(req.params.id, { title: req.body.title });
            return res.status(200).json({message: "Successfully updated"});
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
}

module.exports = new Discussion();
