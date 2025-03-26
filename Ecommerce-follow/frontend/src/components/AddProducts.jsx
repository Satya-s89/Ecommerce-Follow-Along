import { useState } from 'react'
import axios from "axios"
import styles from "./AddProducts.module.css"


const AddProduct = () => {
    const [noOfImages,setNoOfImages] = useState(new Array(1).fill(1));
    const [productDetails,setProductDetails] = useState({
        name:"",
        email:"",
        password:""
    });
    const [productImages,setProductImages] = useState([]);

async function handleSubmit(e) {
    try {
        const {name,email,password} = productDetails;
        if(!name || !email || !password || productImages.length == 0){
            alert("Please Add all fiels");
            return;
        }

        const token = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id"));
        if(!token){
            alert("Please login first");
            return;
        }

        
        const formData = new formData();
        formData.append("name",name);
        formData.append("email",email);
        formData.append("password",password);
        for(let i=0;i<productImages.length();i++){
            formData.append("image",productImages[i]);
        }
        
        await axios.post("http://localhost:8080/user/login",formData,{
            headers:{
                "Authorization":token.token
            }
        });
        
    } catch (error) {
        console.log(error);
        alert("Something went wrong while sending data");
    }
}
  return (
    <div>
        <form action="" className={styles.formbox} onSubmit={handleSubmit}>
            <input type="text" name={"title"} placeholder='Enter Title....' onChange={(event)=>{
                setProductDetails({...productDetails,[event.target.name]:event.target.value});
            }}/>
            <input type="text" name={"description"} placeholder='Enter Product description....' onChange={(event)=>{
                setProductDetails({...productDetails,[event.target.name]:event.target.value});
            }}/>
            <input type='Number' name={"price"} placeholder='Enter Price....' onChange={(event)=>{
                setProductDetails({...productDetails,[event.target.name]:event.target.value});
            }}/>
            <select name="" id="" onChange={(event)=>{
                console.log(event.target.value,noOfImages)
                setNoOfImages(new Array(parseInt(event.target.value)).fill(1));
            }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
            <label htmlFor="">Add Images</label>
            {
                noOfImages.map((ele)=>{
                    <input type='file' accept='image/*' onChange={(e) => {
                        setProductImages([...productDetails,
                            e.target.files[0]]);
                    }}/>   
                })
            }
        </form>
    </div>
  )
}

export default AddProduct