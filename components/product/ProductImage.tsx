import Image from "next/legacy/image";
import { getProductImg, IImagePartial } from "../../lib/imgs";

export default function ProductImage({
  image,
  alt,
  maxSize = 800,
  preserveRatio = false,
}: IProductImageProps) {
  //   const { src, blurSrc, width, height } = getProductImg(
  //     image,
  //     maxSize,
  //     preserveRatio
  //   );

  return (
    <>
      {/* {width && height ? (
        <Image
          src={src}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={blurSrc}
          quality={100}
          alt={alt}
          priority
        />
      ) : (
        <img src={src} alt={alt} itemProp="image" />
      )} */}
      <Image
        src={image.path}
        width={maxSize ? maxSize : image.width!}
        height={maxSize ? maxSize : image.height!}
        quality={100}
        alt={alt}
        priority
      />
    </>
  );
}

interface IProductImageProps {
  image: IImagePartial;
  alt: string;
  maxSize?: number;
  preserveRatio?: boolean;
}
