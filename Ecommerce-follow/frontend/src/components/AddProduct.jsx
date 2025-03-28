import React, { useState } from "react";
import axios from "axios";
import styles from "./AddProduct.module.css";

const AddProduct = () => {
    const [noOfImages, setNoOfImages] = useState([1]);
    const [productDetails, setProductDetails] = useState({
        title: "",
        description: "",
        price: ""
    });
    const [productImages, setProductImages] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { title, description, price } = productDetails;
            if (!title || !description || !price || productImages.length === 0) {
                alert("Please add all fields");
                return;
            }

            const token = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id"));
            if (!token) {
                alert("Please login first");
                return;
            }
            
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            
            productImages.forEach(image => formData.append("images", image));

            const response = await axios.post("http://localhost:8080/product/addproduct", formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    "Authorization": token.token 
                }
            });

            alert("Product added successfully!");
            console.log("Response:", response.data);
        } catch (error) {
            alert("Something went wrong while sending data");
            console.error("Error:", error);
        }
    }

    return (
        <div>
            <form className={styles.formbox} onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter title..." onChange={(e) => 
                    setProductDetails({ ...productDetails, title: e.target.value })
                } />
                <input type="text" placeholder="Enter description..." onChange={(e) => 
                    setProductDetails({ ...productDetails, description: e.target.value })
                } />
                <input type="number" placeholder="Enter price..." onChange={(e) => 
                    setProductDetails({ ...productDetails, price: e.target.value })
                } />
                <select onChange={(e) => 
                    setNoOfImages(Array(parseInt(e.target.value)).fill(1))
                }>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
                <label>Add Images</label>
                {noOfImages.map((_, index) => (
                    <input key={index} type="file" accept="image/*" onChange={(e) => {
                        const newImages = [...productImages];
                        newImages[index] = e.target.files[0];
                        setProductImages(newImages);
                    }} />
                ))}
                <input type="submit" value="Upload product" />
            </form>
        </div>
    );
};

export default AddProduct;
