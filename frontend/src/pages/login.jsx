import React from 'react'
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset, login } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {  email, password } = formData;

    const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector( state => state.auth);

    useEffect( () => {
        if(isError) {
            toast.error(message)
        } 
        if(isSuccess || user) {
            navigate('/')
        }
        dispatch(reset());
    }, [user, isSuccess, isError, message])

    const onChange = (e) => { 
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const onSubmit = (e) => {
		e.preventDefault()

        const userData = {email, password};
        dispatch(login(userData));
	}

    if(isLoading) {
        return <Spinner />
    }


	return (
		<>
			<section className='heading'>
					<h1><FaSignInAlt /> Login</h1>
					<p>Please Fill The Required Fileds!</p>
			</section>
			<section className='form'>
					<form onSubmit={onSubmit}>
                        <div className='form-group'>
                            <input 
                                type='email' 
                                className='form-control'
                                name='email' id='email'
                                placeholder='Enter Your Email-Address' 
                                value={email}
                                onChange={onChange} 
                            />
                        </div>
                        <div className='form-group'>
                            <input 
                                type='password' 
                                className='form-control'
                                name='password' id='password'
                                placeholder='Enter Your Password' 
                                value={password}
                                onChange={onChange} 
                            />
                        </div>
                        <div className='form-group'>
                            <button type='submit' className='btn btn-block'>Login</button>
                        </div>	
					</form>
			</section>
		</>
	)
}

export default Login

