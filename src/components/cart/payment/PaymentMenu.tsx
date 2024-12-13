"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useUIStore } from "@/store";
import { useRouter } from "next/navigation";
import { Title, MercadoPagoButton } from "@/components";
import { getOrderById } from "@/actions";
import Skeleton from "@/components/skeleton/Skeleton";
import AlertMessage from "@/components/ui/alert/AlertMessage";
import styles from "./PaymentMenu.module.css";

interface Props {
  preferenceId: string | null;
}

export const PaymentMenu = ({ preferenceId }: Props) => {

  const isPaymentMenuOpen = useUIStore((state) => state.isPaymentMenuOpen);
  const closePaymentMenu = useUIStore((state) => state.closePaymentMenu);

  return (
    <div className={styles.container}>
      {isPaymentMenuOpen && <div className={styles.blackBackground}></div>}
      {isPaymentMenuOpen && (
        <div
          className={styles.blurBackground}
          onClick={closePaymentMenu}
        ></div>
      )}
      {isPaymentMenuOpen && (
        <div className={styles.paymentsContainer}>
          <AlertMessage
            alertMessage="RECUERDA QUE ESTA ES UNA TIENDA DE PRUEBA. 
                      Por favor, utiliza cuentas de prueba para realizar los pagos"
          />
          <Title title="Payment methods" />

          <div className={styles.paymentContainer}>
            {preferenceId ? (
              <MercadoPagoButton preferenceId={preferenceId} />
            ) : (
              <p>Error al cargar el botón de Mercado Pago</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
