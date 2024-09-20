"use client"

import React, { useState } from 'react'
import type { Size } from '@/interfaces';
import styles from "./SizeSelector.module.css"

interface Props {
    selectedSize: Size;
    availableSizes: Size[];
}


export const SizeSelector = ({selectedSize, availableSizes}:Props) => {
    const [sizeSelected, useSelectedSize] = useState(false);

  return (
    <div>
        <h3>Tallas disponibles</h3>
        <div>
            {
            availableSizes.map(size =>(
                <button key={size}>
                    {size}
                </button>
            ))
            }
        </div>
    </div>
  )
}
