import Image from "next/legacy/image";
import { IImagePartial } from "../../lib/imgs";
import { Media } from "../../@types/newTypes/newTypes";

export default function ProductImage({
  image,
  alt,
  maxSize = 800,
}: IProductImageProps) {
  return (
    <>
      <Image
        src={image.fileUrl}
        width={maxSize}
        height={maxSize}
        quality={100}
        alt={alt}
        priority
      />
    </>
  );
}

interface IProductImageProps {
  image: Media;
  alt: string;
  maxSize?: number;
  preserveRatio?: boolean;
}
