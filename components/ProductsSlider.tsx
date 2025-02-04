import { useRef } from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
import SliderProductItem from "./productsSlider/SliderProductItem";
import ProductItemLoader from "./productsSlider/ProductItemLoader";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { IProduct } from "../@types/product";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function ProductsSlider({
  products,
  loading,
  className,
  swiperProps,
}: ProductsSliderProps) {
  const swiper = useRef<SwiperCore | null>(null);

  return (
    <div className={clsx("products-slider", className || "")}>
      <Swiper
        breakpoints={{
          450: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        centerInsufficientSlides
        className="products-slider__swiper"
        grabCursor={true}
        modules={[Navigation, Scrollbar]}
        navigation={{
          prevEl: ".products-slider__prev",
          nextEl: ".products-slider__next",
        }}
        onSwiper={(instance) => (swiper.current = instance)}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        spaceBetween={20}
        {...(swiperProps || {})}
      >
        {loading
          ? [...Array(5)].map((_, i) => (
              <SwiperSlide className="products-slider__slide" key={i}>
                <ProductItemLoader />
              </SwiperSlide>
            ))
          : products?.map((product) => (
              <SwiperSlide
                className="products-slider__slide"
                key={product.product_id}
              >
                <SliderProductItem product={product} key={product.product_id} />
              </SwiperSlide>
            ))}
      </Swiper>
      <a href="#" className="products-slider__prev">
        <FontAwesomeIcon icon={faChevronLeft as IconProp} size={"lg"} />
      </a>
      <a href="#" className="products-slider__next">
        <FontAwesomeIcon icon={faChevronRight as IconProp} size={"lg"} />
      </a>
    </div>
  );
}

interface ProductsSliderProps {
  products: IProduct[] | null;
  className?: string;
  loading?: boolean;
  swiperProps?: SwiperProps;
}
