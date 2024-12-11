"use client";

import { useEffect, useState } from "react";
import styles from "./UserAddressData.module.css";
import { getOrderById } from "@/actions/order/get-order-by-id";

interface Props {
  params: {
    id: string;
  };
}

export const UserAddressData = ({ params }: Props) => {
  const { id } = params;
  const [address, setAddress] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const { ok, order } = await getOrderById(id);
        if (!ok || !order) throw new Error("No se pudo obtener la dirección");
        setAddress(order.OrderAddress);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchAddress();
  }, [id]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!address) return <p className={styles.loading}>Cargando...</p>;

  return (
    <div className={styles.address}>
      <h2>Dirección de entrega</h2>
      <p>
        Receptor: <span>{address.lastName}, {address.firstName}</span>
      </p>
      <p>Dirección: <span>{address.address}</span></p>
      <p>Ciudad: <span>{address.city}</span></p>
      <p>Código postal: <span>{address.postalCode}</span></p>
      <p>País y estado: <span>{address.countryId}</span></p>
    </div>
  );
};
