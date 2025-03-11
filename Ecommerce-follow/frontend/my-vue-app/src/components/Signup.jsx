import  { useState } from 'react'
import axios from 'axios'
import './Signup.css';

const Signup = () => {
    const [userDetails,setUserDetails] = useState({
        name:"",
        email:"",
        password:""
    });

    function handleInput(e){
        console.log(e.target.value);
        setUserDetails({...userDetails,[e.target.name]:e.target.value});
    }

    async function handleSubmit(){
        if(userDetails.name == ""){
            alert("Name is required");
            return;
        }

        if(userDetails.email == ""){
            alert("Email is required");
            return;
        }

        if(userDetails.password == ""){
            alert("Password is required");
            return;
        }

        try {
            const data = await axios.post("http://localhost:8000/user/Signup");
            console.log(data);
            alert("signup successful");
        } catch (error) {
            console.log(error)
            alert("Something went wrong");
        }
    } 

  return (
    <div className='regis-form'>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor=''>Name</label>
            <input type='text' name='name' placeholder='Name...' onChange={handleInput}/>
            <label htmlFor=''>Email</label>
            <input type='email' name='email' placeholder='Email...' onChange={handleInput}/>
            <label htmlFor=''>Password</label>
            <input type='password' name='password' placeholder='Password...' onChange={handleInput}/>
            <input type='submit'></input>
        </form>
    </div>
  )
}

export default Signup