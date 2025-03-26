import { useState } from 'react';
import axios from "axios";
import styles from "./AddProducts.module.css";

const AddProduct = () => {
    const [noOfImages, setNoOfImages] = useState(new Array(1).fill(1));
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
                alert("Please fill all fields and add at least one image.");
                return;
            }

            const token = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id"));
            if (!token) {
                alert("Please login first.");
                return;
            }

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            for (let i = 0; i < productImages.length; i++) {
                formData.append("image", productImages[i]);
            }

            await axios.post("http://localhost:8080/products/upload", formData, {
                headers: {
                    "Authorization": token.token,
                    "Content-Type": "multipart/form-data"
                }
            });
            alert("Product uploaded successfully!");
        } catch (error) {
            console.error(error);
            alert("Something went wrong while sending data.");
        }
    }

    return (
        <div>
            <form className={styles.formbox} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter Title..."
                    onChange={(event) => {
                        setProductDetails({ ...productDetails, [event.target.name]: event.target.value });
                    }}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Enter Product Description..."
                    onChange={(event) => {
                        setProductDetails({ ...productDetails, [event.target.name]: event.target.value });
                    }}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Enter Price..."
                    onChange={(event) => {
                        setProductDetails({ ...productDetails, [event.target.name]: event.target.value });
                    }}
                />
                <select
                    onChange={(event) => {
                        setNoOfImages(new Array(parseInt(event.target.value)).fill(1));
                    }}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
                <label>Add Images</label>
                {noOfImages.map((ele, index) => (
                    <input
                        key={index}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setProductImages([...productImages, e.target.files[0]]);
                        }}
                    />
                ))}
                <input type="submit" value="Upload Products" />
            </form>
        </div>
    );
};

export default AddProduct;