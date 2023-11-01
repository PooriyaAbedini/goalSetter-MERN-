const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        rquired: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'Please enter a text value']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Goal", goalSchema);