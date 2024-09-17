import React from 'react'
import { Product } from '@/interfaces';
import styles from "./ProductGrid.module.css"


interface Props {
    products: Product[];
}

export const ProductGrid = ({products}:Props) => {
  return (
    <div className={styles.gridContainer}>
        {products.map(product=>(
            <span key={product.slug}>{product.title}</span>
        ))}
    </div>
  )
}
