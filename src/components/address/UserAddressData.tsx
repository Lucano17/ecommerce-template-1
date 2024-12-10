

import React from "react";
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
      <p>Receptor:  <span>{address?.lastName}, {address?.firstName}</span></p>
      <p>Dirección: <span>{address?.address}</span></p>
      <p>Ciudad: <span>{address?.city}</span></p>
      <p>Código postal: <span>{address?.postalCode}</span></p>
      <p>País y estado: <span>{address?.countryId}</span></p>
    </div>
  );
};
