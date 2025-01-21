import React from "react";
import currency from "currency.js";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import { ICartItem } from "../../@types/cart";
import { cartData } from "../../dummy/data";

export default function CheckoutCartItems() {
  // TODO: Integrate with data in cart item
  const cartItems: ICartItem[] = cartData;
  const { formatCurrency } = useFormatCurrency();

  if (!cartItems?.length) {
    return (
      <div style={{ padding: 15, textAlign: "center" }}>
        {"cart.items.cartEmpty"}
      </div>
    );
  }

  return (
    <ul className="bdl-cart-item__list">
      {cartItems?.map((item) => (
        <li className="bdl-cart-item" key={item.basket_item_id}>
          {item.vwItem.image ? (
            <div className="bdl-cart-item__img">
              <img src={item.vwItem.image.path} width={200} height={200} />
            </div>
          ) : (
            <div className="bdl-cart-item__img no-image" />
          )}
          <div className="bdl-cart-item__desc">
            <h5 className="bdl-cart-item__title">
              {item.vwItem.product.title}
              {item.vwItem.variant?.title && (
                <>
                  ,{" "}
                  <span className="bdl-cart-item__variant">
                    {item.vwItem.variant.title}
                  </span>
                </>
              )}
            </h5>
            <div className="bdl-cart-item__price">
              {item.itemPrice.final_price &&
                formatCurrency(item.itemPrice.final_price)}{" "}
              x {item.qty} pcs
            </div>
            <div className="bdl-cart-item__total">
              {item.itemPrice.final_price &&
                formatCurrency(
                  currency(item.itemPrice.final_price)
                    .multiply(item.qty)
                    .toString()
                )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
