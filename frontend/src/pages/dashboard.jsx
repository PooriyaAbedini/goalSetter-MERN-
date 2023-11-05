import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { reset, getGoals } from '../features/goals/goalSlice'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem'


function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector( state => state.auth);
  const { goals, isLoading, isError, message } = useSelector(state => state.goal);



  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getGoals());

    return () =>{
      dispatch(reset());
    }
  }, [user, navigate, dispatch, isError, message])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <GoalForm />
      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map( goal => {
                return <GoalItem key={goal._id} goal={goal} />
              })
            }
          </div>
          ) : (
              <h3>You have not set any goals yet!</h3>
            )
        }
      </section>
    </>
  )
}

export default Dashboard
