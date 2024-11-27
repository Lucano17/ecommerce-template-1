import Image from "next/image";
import React from "react";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  width: number;
  height: number;
  priority?: boolean;
  onMouseEnter?: any;
  onMouseLeave?: any;
}

export const ProductImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const localSrc =
    src && src.trim() !== "" && !src.startsWith("/imgs/") // Asegúrate de no procesar si ya es el placeholder
      ? src.startsWith("http")
        ? src
        : `/products/${src}`
      : "/imgs/placeholder.jpg";

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
