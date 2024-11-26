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
    const localSrc = ( src ) 
    ? src.startsWith('http') // https://urlcompletodelaimagen.jpg
      ? src
      : `/products/${ src }`
    : '/imgs/placeholder.jpg';

  console.log("localSrc:", localSrc); // Verifica la URL final aquí

  return <Image src={localSrc} width={width} height={height} alt={alt} />;
};
