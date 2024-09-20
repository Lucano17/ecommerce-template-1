"use client";

import React from "react";
import { useState } from "react";
import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div>
      <Link href={`product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          width={250}
          height={250}
          onMouseEnter={()=>{setDisplayImage(product.images[1])}}
          onMouseLeave={()=>{setDisplayImage(product.images[0])}}
          priority={true}
        />
      </Link>
      <div>
        <Link href={`/product/${product.slug}`}>{product.title}</Link>
        <span>${product.price}</span>
      </div>
    </div>
  );
};
