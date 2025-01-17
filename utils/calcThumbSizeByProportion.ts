import { TThumbRatio } from "../@types/image";
import { calcProportion } from "./calcProportion";

export function calcThumbSizeByProportion(
  maxSize: number,
  imgRatio: TThumbRatio
) {
  let thumbHeight: number, thumbWidth: number;
  const parts = imgRatio.split("-");

  const width = parseInt(parts[0]);
  const height = parseInt(parts[1]);

  if (width === Math.max(width, height)) {
    thumbWidth = maxSize;
    thumbHeight = calcProportion(maxSize, height, width);
  } else {
    thumbWidth = calcProportion(maxSize, width, height);
    thumbHeight = maxSize;
  }

  return {
    width: thumbWidth,
    height: thumbHeight,
  };
}
