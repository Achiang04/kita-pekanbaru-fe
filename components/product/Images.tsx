import React, { useState } from "react";
import clsx from "clsx";
import ProductImage from "./ProductImage";
import NoImage from "../NoImage";
import dynamic from "next/dynamic";
import { Item, Gallery, useGallery } from "react-photoswipe-gallery";

import "photoswipe/dist/photoswipe.css";
import { IProductItem } from "../../@types/product";
import { TThumbRatio } from "../../@types/image";

const ImagesSlider = dynamic(() => import("./ImagesSlider"), {
  ssr: false,
  loading: () => <div />,
});

export default function ProductImagesWrapper({
  product,
}: {
  product: IProductItem;
}) {
  return (
    <Gallery>
      <ProductImages product={product} />
    </Gallery>
  );
}

function ProductImages({ product }: { product: IProductItem }) {
  const [activeImg, setActiveImg] = useState(0);
  const images = product.images;
  const { open: openLighBox } = useGallery();

  const onImageClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    openLighBox(index);
  };

  if (!images || !images.length) return <NoImage ratio={TThumbRatio["1-1"]} />;

  return (
    <>
      <div className="product-gallery d-none d-md-flex">
        <ul className="product-gallery__thumbs list-unstyled">
          {images.map((image, i) => (
            <Item
              original={image.image.path}
              width={image.image.width}
              height={image.image.height}
              id={image.image.image_id}
              key={image.image.image_id}
            >
              {({ ref }) => (
                <li
                  ref={ref as React.MutableRefObject<HTMLLIElement>}
                  className={clsx("product-gallery__thumb", {
                    active: activeImg === i,
                  })}
                  key={image.image.image_id}
                  onMouseEnter={() => setActiveImg(i)}
                  onClick={() => setActiveImg(i)}
                >
                  <a
                    href="#"
                    className="product-gallery__thumb-link"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <ProductImage
                      image={image.image}
                      maxSize={100}
                      alt={image.alt || product.title}
                      preserveRatio={true}
                    />
                  </a>
                  <meta itemProp="image" content={image.image.path} />
                </li>
              )}
            </Item>
          ))}
        </ul>
        <figure className="product-gallery__big-img">
          <a href="#" onClick={onImageClick.bind(null, activeImg)}>
            <ProductImage
              image={images[activeImg].image}
              maxSize={800}
              alt={images[activeImg].alt || images[activeImg].description!}
            />
          </a>
          <meta itemProp="image" content={images[activeImg].image.path} />
          <figcaption>{images[activeImg].description!}</figcaption>
        </figure>
      </div>

      <div className="d-block d-md-none">
        <ImagesSlider images={images} onClick={openLighBox} />
      </div>
    </>
  );
}
