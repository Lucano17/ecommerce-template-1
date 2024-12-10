"use client"
import React from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline} from 'react-icons/io5'
import styles from "./QuantitySelector.module.css"


interface Props {
    quantity: number;

    onQuantityChanged: (value: number) => void
}

export const QuantitySelector = ({quantity, onQuantityChanged}:Props) => {
    
    const onValueChanged = (value: number) => {
        if (quantity + value < 1 ) return;
        onQuantityChanged(quantity + value);
    };

  return (
    <div className={styles.container}>

        <button className={styles.handleAmountButton}>
            <IoRemoveCircleOutline size={30}
            onClick={()=>onValueChanged(-1)}/>
        </button>

        <span className={styles.amount}>{quantity}</span>

        <button className={styles.handleAmountButton}>
            <IoAddCircleOutline size={30}
            onClick={()=>onValueChanged(+1)}/>
        </button>

    </div>
  )
}
