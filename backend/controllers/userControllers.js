const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc Register User
//@route POST /api/users
//@access public
const registerUser = asyncHandler( async(req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill all fields!')
    }
    
    const userExists = await User.findOne({'email': email});
    if(userExists) {
        res.status(400)
        throw new Error('User already exists!')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    if(newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id),
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data!')
    }
})

//@desc Login a User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler( async(req, res) => {
    const { email, password} = req.body;
    
    //Check for user
    const user = await User.findOne({email});
    
    //Validation
    if(!user) {
        res.status(400)
        throw new Error('There is no user with this E-mail address!');
    }
    else {
        if (await bcrypt.compare(password, user.password)) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })
        }
        else {
            res.status(400)
            throw new Error('Wrong password!')
        }
    }
})

//@desc GET Users Data
//@route POST /api/users/me
//@access public
const getMe = asyncHandler( async(req, res) => {
    const {_id, name, email} = await User.findById(req.user._id);
    res.status(200).json({
        id: _id,
        username: name,
        userEmail: email
    })
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}