import React from 'react'
import axios from 'axios'
import { useState ,useEffect } from 'react';
import Card from './Card';
import styles from './products.module.css'

const products = () => {
  const [products,setProducts] = useState([]);

    function getData(){
        axios.get("https://fakestoreapi.com/products")
        .then(response => {
            console.log(response.data);
            setProducts(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
      getData();
    },[])

  return (
    <div className={styles.products}>
      {
        products.map(ele => {
          return <Card products={ele} key={ele.id}/>
        })
      }
    </div>
  )
}

export default products