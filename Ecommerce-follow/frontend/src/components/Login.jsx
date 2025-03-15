import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  function handelInput(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (loginData.email === '') {
      alert('Please enter email');
      return;
    }
    if (loginData.password === '') {
      alert('Please enter password');
      return;
    }
    alert('You successfully logged in');
  }

  return (
    <div className="container">
    <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handelInput}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handelInput}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
