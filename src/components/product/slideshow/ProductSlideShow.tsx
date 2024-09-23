"use client";

import React, { useState } from "react";
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";

import styles from "./ProductSlideShow.module.css"

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideShow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div>
      <Swiper
        // style={
        //   {
        //     "--swiper-navigation-color": "#fff",
        //     "--swiper-pagination-color": "#fff",
        //   } as React.CSSProperties
        // }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mySwiper2}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
            width={290}
            height={290}
            src={`/products/${image}`}
            alt={title}
            priority={true}/>
          </SwiperSlide>
        ))}
      </Swiper>
        <div>
        <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        // Colocar images amount para que cargue siempre la cantidad de images del producto
        slidesPerView={2}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mySwiper}
      >
         {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
            width={100}
            height={100}
            src={`/products/${image}`}
            alt={title}
            priority={true}/>
          </SwiperSlide>
        ))}
      </Swiper>
        </div>
      
    </div>
  );
};
