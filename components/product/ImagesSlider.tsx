import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import ProductImage from "./ProductImage";
import { IProductImage } from "../../@types/image";
import { Media } from "../../@types/newTypes/newTypes";

export default function ImagesSlider({ images, onClick }: ImagesSliderProps) {
  const swiper = useRef<SwiperCore | null>(null);

  const onImageClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    onClick(index);
  };

  return (
    <div className="slider mb-5">
      <div className={"slider__wrapper"}>
        <Swiper
          grabCursor={true}
          modules={[Navigation, Pagination]}
          centerInsufficientSlides
          slidesPerView={1}
          spaceBetween={0}
          breakpoints={{
            576: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 28,
            },
          }}
          pagination={{ clickable: true }}
          navigation
          onSwiper={(instance) => (swiper.current = instance)}
        >
          {images.map((image, i) => (
            <SwiperSlide key={image.id} onClick={onImageClick.bind(null, i)}>
              <ProductImage image={image} maxSize={800} alt={image.fileType} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

interface ImagesSliderProps {
  images: Media[];
  onClick: (i: number) => void;
}
