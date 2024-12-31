"use client";

import React, { useState } from "react";
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./ProductSlideShow.module.css";
import { ProductImage } from "@/components";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideShow = ({ images, title }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  const displayImages = images.length > 0 ? images : ["/imgs/placeholder.jpg"];

  return (
    <div>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mySwiper2}
      >
        {displayImages.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              width={423}
              height={350}
              src={image}
              alt={title}
              priority={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.mySwiper}
        >

          {displayImages.map((image) => (
            <SwiperSlide key={image}>
              <ProductImage
                width={90}
                height={100}
                src={image}
                alt={title}
                priority={true}
                />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
