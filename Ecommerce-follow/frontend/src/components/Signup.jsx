import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [userDetail, setUserDetail] = useState({
    name: '',
    email: '',
    password: ''
  });

  function handleInput(e) {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (userDetail.name === '') {
      alert('Please enter your name');
      return;
    }
    if (userDetail.email === '') {
      alert('Please enter your email');
      return;
    }
    if (userDetail.password === '') {
      alert('Please enter your password');
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/user/signup", userDetail);
      console.log('Response:', response.data);
      alert('Signup successful');
    } catch (err) {
      console.error("Error during signup:", err);
      alert('Something went wrong');
    }
  }

  return (
    <div className='signup'>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type='text' name='name' placeholder='Name...' onChange={handleInput} />
        <label htmlFor="email">Email</label>
        <input type='email' name='email' placeholder='Email...' onChange={handleInput} />
        <label htmlFor="password">Password</label>
        <input type='password' name='password' placeholder='Password...' onChange={handleInput} />
        <input type='submit' value="Sign Up" />
      </form>
    </div>
  );
};

export default Signup;
