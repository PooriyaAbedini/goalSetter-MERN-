const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name!'],
        required: true
    },
    email: {
      type: String,
      required: [true, 'Please enter your E-mail address!'],
      unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password!'],
    }
},
{
timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;