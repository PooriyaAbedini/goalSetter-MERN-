import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

function GoalForm() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const { user } = useSelector( state => state.auth)
    const onChange = (e) => {
      setText(e.target.value);
    }
  
    const onSubmit = (e) => {
      e.preventDefault();
      dispatch(createGoal({text}))
      setText('');
    }

  return (
    <>
         <section className='heading'>
        <h1>Welcome { user && user.name } </h1>
        <p>Goals dashboard</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='text'>Goal</label>
                <input type='text'
                name='text' 
                id='text' 
                value={text} 
                onChange={onChange}
                placeholder='Enter Your Goal'               
                />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn'>
              Add Goal
            </button>
          </div>      
        </form>         
      </section>
    </>
  )
}

export default GoalForm
