"use client"; // Indica que este componente es para el cliente

import { useEffect } from "react";

interface Props {
    alertMessage: string
}

export default function AlertMessage({alertMessage}: Props) {
  useEffect(() => {
    alert(alertMessage);
  }, []);

  return null; // No necesitamos renderizar nada, solo mostrar la alerta
}
