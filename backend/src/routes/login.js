const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const router = require('express').Router();

const secretKey = process.env.JWT_SECRET_KEY;

const User = require('../models/users');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!(username && password)) {
            res.status(400).json({ message: 'Both username and password fields are required' });
        }

        const doesUserAlreadyExist = await User.findOne({ username });

        if(doesUserAlreadyExist) {
            res.status(400).json({ message: 'User already exists' });
        }

        encryptedPassword = await bcrypt.hash(password, 16);

        const user = await User.create({
            username: username.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign({ username: user.username }, secretKey);
        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
      }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!(username && password)) {
            res.status(400).json({ message: 'Both username and password fields are required' });
        }

        const user = await User.findOne({ username });
        
        if(user === null) {
            res.status(400).json({ message: 'User does not exist' });
        }

        if(user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ username: user.username }, secretKey);
            user.token = token;

            res.status(200).json(user);
        }

        res.status(400).json({ message: 'Invalid credentials' });
    } catch (err) {
        console.log(err);
    }
 });

module.exports = router;