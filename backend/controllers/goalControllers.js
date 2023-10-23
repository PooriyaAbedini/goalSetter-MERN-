const asyncHandler = require('express-async-handler')

//@desc Get Goals
//@route GET /api/goals
//@access Private
const getGoals = (req, res) => {
    res.status(200).json({ message: "Get Goals" });
}

//@desc Set Goals
//@route POST /api/goals
//@access Private
const setGoal = (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please enter a text field');
    }else {
        res.status(200).json({ message: `'${req.body.text}' Added to goals`})
    }
}

//@desc Update Goals
//@route PUT /api/goals/:id
//@access Private
const updateGoal = (req, res) => {
    res.status(200).json({ message: `Update Goal ${req.params.id}`})
}

//@desc Delete Goals
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = (req, res) => {
    res.status(200).json({ message: `Delete Goal ${req.params.id}`})
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}