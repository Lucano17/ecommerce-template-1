"use client"
import React, { useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline} from 'react-icons/io5'
import styles from "./QuantitySelector.module.css"


interface Props {
    quantity: number
}

export const QuantitySelector = ({quantity}:Props) => {
    const [count, setCount] = useState(quantity);
    const onQuantityChanged = (value: number) => {
        if (count + value < 1 ) return;
        setCount(count + value);
    };

  return (
    <div className={styles.container}>

        <button className={styles.handleAmountButton}>
            <IoRemoveCircleOutline size={30}
            onClick={()=>onQuantityChanged(-1)}/>
        </button>

        <span className={styles.amount}>{count}</span>

        <button className={styles.handleAmountButton}>
            <IoAddCircleOutline size={30}
            onClick={()=>onQuantityChanged(+1)}/>
        </button>

    </div>
  )
}
