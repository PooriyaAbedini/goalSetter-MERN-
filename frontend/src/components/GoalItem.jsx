import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'
import Spinner from '../components/Spinner'
function GoalItem({goal}) {
    const dispatch = useDispatch();

    const { isLoading } = useSelector(state => state.goal);

    if(isLoading) {
        return <Spinner />
    }

    return (
    <div className='goal'>
        <div>
            {new Date (goal.createdAt).toLocaleString('en-US')}
        </div>
        <h3>{goal.text}</h3>
        <button onClick={() => {dispatch(deleteGoal(goal._id))}} className='close'>
            X
        </button>
    </div>
    )
}

export default GoalItem
