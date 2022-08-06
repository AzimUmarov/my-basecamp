const attachmentModel = require('../models/attachment');

class Attachment {
    async getAll(req, res) {
        try {
            const tasks = await attachmentModel.find({
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
            const task = await attachmentModel.findById(id);
            return res.status(200).json(task);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async create(req, res) {
        try {
            const attachment = new attachmentModel({
                type: req.body.type,
                data: req.body.data,
                project: req.params.id
            });
            await attachment.save();
            return res.status(200).json(attachment);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async delete(req, res) {
        try {
            const attachment = await attachmentModel.findByIdAndDelete(req.params.id);
            return res.status(200).json(attachment);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async update(req, res) {
        try {
            await  attachmentModel.findByIdAndUpdate(req.params.id, { type: req.body.type, data: req.body.data});
            return res.status(200).json({message: "Successfully updated"});
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
}

module.exports = new Attachment();
