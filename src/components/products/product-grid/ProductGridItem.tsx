import React from "react";
import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  return (
    <div>
        <Link href={`product/${product.slug}`}>
        <Image
        src={`/products/${product.images[0]}`}
        alt={product.title}
        width={250}
        height={250}
      />
        </Link>
      <div>
        <Link href={`product/${product.slug}`}>{product.title}</Link>
        <span>${product.price}</span>
      </div>
    </div>
  );
};
