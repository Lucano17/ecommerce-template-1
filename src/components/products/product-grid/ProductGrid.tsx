import React from 'react'
import { Product } from '@/interfaces';
import styles from "./ProductGrid.module.css"
import { ProductGridItem } from './ProductGridItem';


interface Props {
    products: Product[];
}

export const ProductGrid = ({products}:Props) => {
  return (
    <div className={styles.gridContainer}>
        {products.map(product=>(
            <ProductGridItem
            key={product.slug}
            product={product}/>
        ))}
    </div>
  )
}
