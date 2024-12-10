"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import styles from "./ProductMobileSlideShow.module.css";
import { ProductImage } from "@/components";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        pagination
        modules={[FreeMode, Pagination]}
        className={styles.mySwiper2}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              width={423}
              height={350}
              src={image}
              alt={title}
              priority={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
