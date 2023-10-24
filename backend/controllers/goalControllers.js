const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel');
const { set } = require('mongoose');

//@desc Get Goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler( async (req, res) => {
    const goals = await Goal.find();
    res.status(200).json(goals);
})

//@desc Set Goals
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler( async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please enter a text field');
    }else {
        const goal = await Goal.findOne({text : req.body.text});
        if(goal) res.status(200).json({message: 'This goal is already included!'});
        else {
            const goal = new Goal({
                text: req.body.text
            });
            await goal.save();
            res.status(200).json(goal);
        }
    }
})

//@desc Update Goals
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler( async (req, res) => {
    const goalToUpdate = await Goal.findById(req.params.id);
    if(!goalToUpdate) {
        res.status(400)
        throw new Error('Goal Not Found!');
    }
    else {
       const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,
         {
            new: true
        });
       res.status(200).json(updatedGoal);
    }
})

//@desc Delete Goals
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler( async (req, res) => {
    const goalToDelete = await Goal.findOne({_id: req.params.id});
    if(!goalToDelete) {
        res.status(400)
        throw new Error('Goal Not Found!');
    }
    const deletedGoal = await Goal.findByIdAndRemove(goalToDelete._id);
    res.status(200).json({id: deletedGoal.id});
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}