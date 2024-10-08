"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Image from "next/image";

import styles from "./ProductMobileSlideShow.module.css"

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
          height: "500px"
        }}
        pagination
        modules={[FreeMode, Pagination]}
        className={styles.mySwiper2}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
            width={423}
            height={350}
            src={`/products/${image}`}
            alt={title}
            priority={false}/>
          </SwiperSlide>
        ))}
      </Swiper>
        
        </div>
  );
};
