import React from 'react'
import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

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
					<h1><FaUser /> Register</h1>
					<p>Please create an account!</p>
			</section>
			<section className='form'>
					<from onSubmit={onSubmit}>
						<div className='form-group'>
							<input 
								type='text' 
								className='form-control'
								name='name' id='name'
								placeholder='Enter Your Name' 
								value={name}
								onChange={onChange} 
							/>
						</div>
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
							<input 
								type='password' 
								className='form-control'
								name='password2' id='password2'
								placeholder='Confirm Your Password' 
								value={password2}
								onChange={onChange} 
							/>
						</div>
						<div className='form-group'>
							<button type='submit' className='btn btn-block'>Submit</button>
						</div>	
					</from>
			</section>
		</>
	)
}

export default Register
