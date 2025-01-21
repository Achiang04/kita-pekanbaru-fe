import Image from "next/legacy/image";
import { IImagePartial } from "../../lib/imgs";

export default function ProductImage({
  image,
  alt,
  maxSize = 800,
}: IProductImageProps) {
  return (
    <>
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
