
import React, { useEffect, useState } from "react";
import styles from "./IsPaid.module.css"
import { IoCardOutline } from "react-icons/io5";
import { getOrderById } from "@/actions";

interface Props {
  params: {
    id: string;
  };
}

export const IsPaid = async({ params }: Props) => {
  const {id} = params
    const {ok, order, message} = await getOrderById(id)

  return (
    <div className={styles.container}>
      {order?.isPaid ? (
        <div className={styles.paidTrue}>
          <IoCardOutline size={30} className={styles.paidCardIcon}/>
          <p>Pago realizado</p>
        </div>
      ) : (
        <div className={styles.paidFalse}>
          <IoCardOutline size={20} className={styles.paidCardIcon}/>
          <p>Pendiente de pago</p>
        </div>
      )}
    </div>
  );
  
};
