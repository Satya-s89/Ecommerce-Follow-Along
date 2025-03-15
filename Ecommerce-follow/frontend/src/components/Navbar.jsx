import { useNavigate } from 'react-router-dom'
import styles from "./Navbar.module.css";

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
    <div
    onClick={()=>{
        navigate("/");
    }}>
        <h1>Home</h1>
    </div>
    
    <div>
        <div
        onClick={()=>{
            navigate("/login");
        }}>Login</div>
        
        <div
        onClick={()=>{
            navigate("/signup");
        }}>Signup</div>
    </div>
    </div>
  )
}

export default Navbar