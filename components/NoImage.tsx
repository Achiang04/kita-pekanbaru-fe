import clsx from "clsx";
import { TThumbRatio } from "../@types/image";

export default function NoImage({
  ratio,
  className,
}: {
  ratio: TThumbRatio;
  className?: string;
}) {
  return (
    <div className={clsx(`no-image r-${ratio}`, className)}>
      <div className={"no-image__bg"}></div>
    </div>
  );
}
