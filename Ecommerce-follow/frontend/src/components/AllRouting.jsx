import React from 'react'
import {Route,Routes} from "react-router-dom"; 
import Products from "./Products";
import Login from "./Login";
import Signup from "./Signup";


const AllRouting = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Products/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
        </Routes>
    </div>
  )
}

export default AllRouting