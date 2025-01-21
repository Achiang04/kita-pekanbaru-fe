import Image from "next/legacy/image";
import { IImagePartial } from "../../lib/imgs";

export default function ProductListImage({
  image,
  alt,
  maxSize = 500,
}: {
  image: IImagePartial;
  alt?: string;
  maxSize?: number;
}) {
  return (
    <div className={"img text-center"}>
      <Image
        src={image.path}
        width={image.width ? image.width : maxSize}
        height={image.height ? image.height : maxSize}
        quality={100}
        itemProp="image"
        alt={alt}
      />
    </div>
  );
}
