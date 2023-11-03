import React from 'react'
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {  email, password } = formData;

    const onChange = (e) => { 
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	 }

	 const onSubmit = (e) => {
		e.preventDefault()
	 }


	return (
		<>
			<section className='heading'>
					<h1><FaSignInAlt /> Login</h1>
					<p>Please Fill The Required Fileds!</p>
			</section>
			<section className='form'>
					<from onSubmit={onSubmit}>
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
					</from>
			</section>
		</>
	)
}

export default Login

