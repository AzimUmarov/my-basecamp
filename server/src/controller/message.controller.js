const messageModel = require('../models/message');

class Discussion {
    async getAll(req, res) {
        try {
            const messages = await messageModel.find({
                discussion_id: req.params.id
            });
            return res.status(200).json(messages);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async getOne(req, res) {
        try {
            const id = req.params.id;
            console.log(id);
            if (!id) {
                return res.status(404).json({ message: "Please provide a valid id" });
            }
            const message = await messageModel.findById(id);
            console.log(message)
            return res.status(200).json(message);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async create(req, res) {
        try {
            const { user } = req.body;
            const message = new messageModel({
                message: req.body.message,
                discussion_id: req.params.id,
                creator_id: user._id
            });
            await message.save();
            return res.status(200).json(message);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async delete(req, res) {
        try {
            await messageModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({message: "Successfully deleted"});
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async update(req, res) {
        try {
            const message = await  messageModel.findByIdAndUpdate(req.params.id, { message: req.body.message });
            return res.status(200).json({message});
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
}

module.exports = new Discussion();
