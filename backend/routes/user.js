
const express = require("express");
const {User}= require("../db");
const { JWT_SECRET } = require("../config");
const { object, string } = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.use(express.json());

const signupSchema = object({
    email: string().email(),
    name: string(),
    password: string().min(6),
});

const signinSchema = object({
    email: string().email(),
    password: string().min(6),
});

router.post('/signup', async (req, res) => {
    try {
        const body = req.body;

        const { email, name, password } = signupSchema.parse(body);

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.status(403).json({ error: 'User already exists' });
            return;
        }

        const newUser = await User.create({
            email: email,
            name: name,
            password: password
        });

        const payload = { id: newUser._id };
        const token = jwt.sign(payload, JWT_SECRET);
        res.status(200).json({ token: token, name: name });
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const body = req.body;

        const { email, password } = signinSchema.parse(body);

        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (user.password !== password) {
            res.status(401).json({ error: 'Invalid password' });
            return;
        }

        const payload = { id: user._id };
        const token = jwt.sign(payload, JWT_SECRET);
        res.status(200).json({ msg: "Logged in", token: token, name: user.name });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;