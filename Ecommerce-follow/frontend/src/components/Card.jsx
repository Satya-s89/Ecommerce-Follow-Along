import React from 'react'
import styles from './card.module.css';

const Card = ({products}) =>  {
  return (
    <div className={styles.card}>
        <img src={products.image} alt={products.title} />
        <h3>{products.title}</h3>
        <p>${products.price}</p>
    </div>
  )
}

export default Card