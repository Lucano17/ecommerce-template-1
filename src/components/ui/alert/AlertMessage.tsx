"use client";

import { useEffect } from "react";

interface Props {
    alertMessage: string
}

export default function AlertMessage({alertMessage}: Props) {
  useEffect(() => {
    alert(alertMessage);
  }, [alertMessage]);

  return null;
}
