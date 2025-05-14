import React from 'react'
import {Route, Routes} from "react-router-dom";
import Products from './components/Products';
import Login from './components/Login';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import MyProducts from './components/MyProducts';
import Cart from "./components/Cart"
import User from './components/User';
import UserAddress from './components/UserAddress';
import AllAddress from './components/AllAddress';
import Checkout from './components/Checkout';
import MyOrders from './components/MyOrders';
import Payment from './components/Payment';
import PrivateRoute from './components/PrivateRoute';

const AllRouting = () => {
  return (
    <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Products/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>

        {/* Protected Routes */}
        <Route path='/addproducts' element={
          <PrivateRoute>
            <AddProduct/>
          </PrivateRoute>
        }/>
        <Route path='/myproducts' element={
          <PrivateRoute>
            <MyProducts/>
          </PrivateRoute>
        }/>
        <Route path='/cart' element={
          <PrivateRoute>
            <Cart/>
          </PrivateRoute>
        }/>
        <Route path='/user' element={
          <PrivateRoute>
            <User/>
          </PrivateRoute>
        }/>
        <Route path='/user-address' element={
          <PrivateRoute>
            <UserAddress/>
          </PrivateRoute>
        }/>
        <Route path='/all-address' element={
          <PrivateRoute>
            <AllAddress/>
          </PrivateRoute>
        }/>
        <Route path='/checkout' element={
          <PrivateRoute>
            <Checkout/>
          </PrivateRoute>
        }/>
        <Route path='/myorders' element={
          <PrivateRoute>
            <MyOrders/>
          </PrivateRoute>
        }/>
        <Route path='/payment' element={
          <PrivateRoute>
            <Payment/>
          </PrivateRoute>
        }/>

        {/* 404 Route */}
        <Route path='*' element={<h1>404 Not Found</h1>} />
    </Routes>
  )
}

export default AllRouting