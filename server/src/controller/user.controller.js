const User = require('../models/user.js');
const jwt = require("jsonwebtoken");


class UserController {
    async getAll(req, res) {
        try {
            const users = await User.find();
            return res.status(200).json(users);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async getOne(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(404).json({ message: 'Please provide a valid id' });
            }
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User is not exist' });
            }
            return res.status(200).json(user);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async edit (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(404).json({ message: 'Please provide a valid id' });
            }
            let { name, email, password } = req.body;
            if(password)
                password = await jwt.sign({ foo: 'bar' }, password);
            const user = await User.findByIdAndUpdate(id, { name, email, password });
            return res.status(200).json(user);
        } catch (e) {
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
    async delete (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(404).json({ message: 'Please provide a valid id' });
            }
            const validId = await User.findById(id);
            if (!validId) {
                return res.status(404).json({ message: 'User is not exist' });
            }
            await User.findByIdAndDelete(id);
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({ message: `Error in ${e}, pls try again` });
        }
    }
}

module.exports = new UserController()
