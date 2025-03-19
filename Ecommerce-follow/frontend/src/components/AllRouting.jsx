import {Route,Routes} from "react-router-dom"; 
import Products from "./Products";
import Login from "./Login";
import Signup from "./Signup";
import AddProducts from "./AddProducts";


const AllRouting = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Products/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/addproducts' element={<AddProducts/>}/>
        </Routes>
    </div>
  )
}

export default AllRouting