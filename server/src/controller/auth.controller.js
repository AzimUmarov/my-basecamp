require('dotenv').config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const redis = require('redis');


class AuthController {
    async login(req, res) {
        const {email, password} = req.body;
        if(email.length < 3 || password.length < 4)
            return res.setHeader("Content-Type", "application/json").status(403).json({message: "invalid user data"});
        console.log(email + " " + password);
        const user = await userModel.findOne({email: email});
        if (!user)
            return res.setHeader("Content-Type", "application/json").status(401).json({message: "User not found"});
        let incorrectPassword = false;

        await jwt.verify(user.password, password, (err, user) => {
            if (err)
                incorrectPassword = true;
        });

        if (incorrectPassword)
            return res.setHeader("Content-Type", "application/json").status(403).json({message: "password isn't correct, please try again!"}).end();

        try {
            await jwt.sign(email, password, async (err, token) => {
                const client = redis.createClient({
                    url: process.env.REDIS_ENDPOINT + "",
                    password: process.env.REDIS_PASSWORD + ""
                });
                client.on('error', (err) => console.log('Redis Client Error', err));
                await client.connect();
                await client.set(token, token);
                return res.setHeader("Content-Type", "application/json").status(200).json({token: token, existingUser: user});
            });
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async register(req, res){
        const {name, email, password} = req.body;

        const client = redis.createClient({
            url: process.env.REDIS_ENDPOINT + "",
            password:  process.env.REDIS_PASSWORD + ""
        });

        //some validations
        if(name?.length < 3 || password?.length < 4)
        return res.status(400).json({message: "User data not valid :)"});

        const existingUser = await userModel.findOne({email: email});

        if(existingUser)
        return res.status(400).json({message: "User already exist login via /login path :)"});

        let passToken = await jwt.sign({ foo: 'bar' }, password);

        try {
        if (passToken) {
            const user = new userModel({name, email, password: passToken});
            await user.save().catch(err => console.log(err.message));
            console.log(user);
            jwt.sign(name, password, async (err, token) => {
                if (err)
                    return res.status(403).json({message: "error while generating token"});

                client.on('error', (err) => console.log('Redis Client Error', err));
                await client.connect();
                await client.set(token, token);
                res.status(200).json({message: "user created", token: token, user});
            });
        }
        }
        catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
    async logout(req, res){
        const token = req.headers["authorization"];
        //const authHeader = req.headers['authorization'];
        //const token = authHeader && authHeader.split(" ")[1];
        const client = redis.createClient({
            url: process.env.REDIS_ENDPOINT + "",
            password:  process.env.REDIS_PASSWORD + ""
        });
        client.on('error', (err) => console.log('Redis Client Error', err));
        await client.connect();
        try {
        await client.del(token);
        res.status(200).json({message: "signet out"});
        }
        catch (e){
            res.status(500).json({message: e.message});
        }
    }
}

module.exports = new AuthController();
