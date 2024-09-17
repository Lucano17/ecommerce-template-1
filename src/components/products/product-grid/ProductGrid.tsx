import React from 'react'
import { Product } from '@/interfaces';


interface Props {
    products: Product[];
}

export const ProductGrid = ({products}:Props) => {
  return (
    <div>
        {products.map(product=>(
            <span key={product.slug}>{product.title}</span>
        ))}
    </div>
  )
}
