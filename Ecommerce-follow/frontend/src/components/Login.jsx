import  { useState } from 'react'
import "./Login.css"

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    function handleinput(e){
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(loginData.email === ""){
            alert('Email is required')
            return;
        }
        if(loginData.password === ""){ 
            alert('Password is required')
            return;
        }

        alert("You are successfully logged in");
    }   


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor=''>Email : </label>
                <input type="email" value={loginData.email} name='email' onChange={handleinput} placeholder="Enter your email" />
            </div>
            <div>
                <label>Password : </label>
                <input type="password" value={loginData.password} name="password" onChange={handleinput} placeholder="Enter your password" />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}


export default Login