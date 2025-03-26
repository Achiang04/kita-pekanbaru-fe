import React from "react";
import currency from "currency.js";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import { ICartItem } from "../../@types/cart";
import { cartData } from "../../dummy/data";
import { CheckoutItemType } from "../../@types/newTypes/newTypes";
import NoImage from "../NoImage";
import { TThumbRatio } from "../../@types/image";

interface Props {
  checkoutItem: CheckoutItemType;
}

export default function CheckoutCartItems({ checkoutItem }: Props) {
  // TODO: Integrate with data in cart item
  const cartItems: ICartItem[] = cartData;
  const { formatRupiah } = useFormatCurrency();

  if (!cartItems?.length) {
    return (
      <div style={{ padding: 15, textAlign: "center" }}>
        {"cart.items.cartEmpty"}
      </div>
    );
  }

  return (
    <ul className="bdl-cart-item__list">
      {checkoutItem.orderItems?.map((item) => (
        <li className="bdl-cart-item" key={item.product.id}>
          {item.product ? (
            <div className="bdl-cart-item__img">
              {/* <img src={item.product.} width={200} height={200} /> */}
              <NoImage ratio={TThumbRatio["1-1"]} className={"bg-xs"} />
            </div>
          ) : (
            <div className="bdl-cart-item__img no-image" />
          )}
          <div className="bdl-cart-item__desc">
            <h5 className="bdl-cart-item__title">
              {item.product.name}
              {/* {item.vwItem.variant?.title && (
                <>
                  ,{" "}
                  <span className="bdl-cart-item__variant">
                    {item.vwItem.variant.title}
                  </span>
                </>
              )} */}
            </h5>
            <div className="bdl-cart-item__price">
              {item.price && formatRupiah(item.price)} x {item.qty} pcs
            </div>
            <div className="bdl-cart-item__total">
              {item.total && formatRupiah(item.total)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
