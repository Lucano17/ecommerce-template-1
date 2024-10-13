import React, { useEffect, useState } from "react";

export const useWidthDimention = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const detectDimention = () => {
      const width = window.innerWidth;
      setIsMobile(width < 800);
    };

    detectDimention();
    window.addEventListener("resize", detectDimention);
    return () => {
      window.removeEventListener("resize", detectDimention);
    };
  }, []);
  return isMobile;
};
