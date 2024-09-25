"use client"
import React, { useEffect, useState } from "react";
import styles from "./IsPaid.module.css"
import { IoCardOutline } from "react-icons/io5";



export const IsPaid = () => {
  const [isPaid, setIsPaid] = useState(false);

  useEffect (()=>{
    
  },[])

  return (
    <div className={styles.container}>
        <button onClick={()=>setIsPaid(!isPaid)}>Cambiar estado</button>
      {isPaid ? (
        <div className={styles.paidTrue}>
          <IoCardOutline size={30} />
          <p>Pago realizado</p>
        </div>
      ) : (
        <div className={styles.paidFalse}>
          <IoCardOutline size={30} />
          <p>Pendiente de pago</p>
        </div>
      )}
    </div>
  );
};
