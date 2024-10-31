

import React, { useEffect } from "react";
import { getOrderById } from "@/actions/order/get-order-by-id";
import styles from "./UserAddressData.module.css";

interface Props {
    params: {
      id: string;
    };
  }

export const UserAddressData = async({ params }: Props) => {
    const { id } = params;
    const { ok, order } = await getOrderById(id);
    const address = order!.OrderAddress;

  return (
    <div className={styles.address}>
      <h2>Dirección de entrega</h2>
      <h3>
       {address?.lastName} {address?.firstName}
      </h3>
      <p>Dirección: {address?.address}</p>
      <p>Ciudad: {address?.city}</p>
      <p>Código postal: {address?.postalCode}</p>
      <p>País y estado: {address?.countryId}</p>
    </div>
  );
};
