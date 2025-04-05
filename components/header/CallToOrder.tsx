import clsx from "clsx";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { calcTotalPrice } from "../../lib/calculator";
import { hideCall2Order } from "../../redux/reducers/cart";
import { RootState } from "../../redux/store";
import ProductImage from "../productsList/ProductImage";
import NoImage from "../NoImage";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import { TThumbRatio } from "../../@types/image";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function CallToOrder() {
  const dispatch = useAppDispatch();
  const { formatRupiah } = useFormatCurrency();

  const show = useAppSelector((state: RootState) => state.cart.showCall2Order);
  const [hiding, setHiding] = useState(false);
  const { item, qty, price } = useAppSelector(
    (state: RootState) => state.cart.call2OrderData
  );

  const hide = () => {
    setHiding(true);
    setTimeout(() => {
      setHiding(false);
      dispatch(hideCall2Order());
    }, 300);
  };

  useEffect(() => {
    if (show) {
      document.body.addEventListener("click", hide);
    } else {
      document.body.removeEventListener("click", hide);
    }
    return () => {
      document.body.removeEventListener("click", hide);
    };
  }, [show]); //eslint-disable-line

  return (
    <div className={clsx("call-to-order__wrapper", { "d-none": !show })}>
      <div className="container call-to-order__container">
        <div
          className={clsx("call-to-order", { opened: show, hiding: hiding })}
          onClick={(e) => e.stopPropagation()}
        >
          <h5 className={"call-to-order__header mb-3"}>
            Product added to cart
            <button className="btn-close btn-sm" onClick={hide} />
          </h5>
          {item && (
            <>
              <div className="call-to-order__item mb-3">
                <div className="call-to-order__img-wrapper">
                  {item.medias ? (
                    <ProductImage
                      image={{ path: item.medias[0].fileUrl }}
                      alt={item.name}
                      maxSize={100}
                    />
                  ) : (
                    <NoImage ratio={TThumbRatio["1-1"]} />
                  )}
                </div>
                <div className={"desc"}>
                  <div>{item.name}</div>
                  {/* {item.variant && (
                    <div className={"text-muted variant mt-1"}>
                      {item.variant.title}
                    </div>
                  )} */}
                </div>
              </div>
              {price && qty && (
                <div className="mb-3">
                  {`${formatRupiah(price)} x ${qty} = ${formatRupiah(
                    price * qty
                  )}`}
                </div>
              )}
            </>
          )}
          <div className="text-end">
            <Link href="/cart" className="btn btn-action btn-anim">
              <FontAwesomeIcon icon={faCheck as IconProp} />
              Place an order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
