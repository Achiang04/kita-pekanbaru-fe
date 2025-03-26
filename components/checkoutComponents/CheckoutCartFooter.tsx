import React, { useState } from "react";
import clsx from "clsx";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import { ISystemTax, TCalculateTaxBasedOn } from "../../@types/settings";
import { IOrder, TDiscountType } from "../../@types/order";
import {
  cartOrder,
  cartCheckoutTotalDummy,
  taxSettingsDummy,
} from "../../dummy/data";
import { ITotal } from "../../@types/total";

export default function CheckoutCartFooter({
  open,
  totalPay,
}: ICartFooterProps) {
  // TODO: Change dummy data to real data
  const order: IOrder = cartOrder;
  const total: ITotal = cartCheckoutTotalDummy;
  const taxSettings: ISystemTax = taxSettingsDummy;
  const { formatRupiah } = useFormatCurrency();

  const handleRmDiscount = (e: React.MouseEvent) => {
    // TODO: handler for remove dicount voucher
  };

  if (!order || !total) return null;

  const hasDiscount = total.discount != "0";
  const hasShipping = total.servicesSubTotal.price != "0";
  const hasTax = taxSettings?.turnedOn && Number(total.tax.totalTaxAmount) > 0;

  return (
    <div className={clsx("bdl-cart__footer", { open })}>
      {/* {(hasShipping || hasDiscount || hasTax) && (
        <div className="bdl-cart__footer-row">
          <h5 className="bdl-cart__footer-title">
            Subtotal
            <span className="bdl-cart__footer-value">
              {" "}
              {formatCurrency(total.itemsSubTotal.price)}
            </span>
          </h5>
        </div>
      )}
      {hasDiscount && (
        <div className="bdl-cart__footer-row">
          <h5 className="bdl-cart__footer-title">
            Discount
            <span className="bdl-cart__footer-value">
              {" "}
              -{formatCurrency(total.discount)}
            </span>
          </h5>
        </div>
      )}
      {hasShipping && (
        <div className="bdl-cart__footer-row">
          <h5 className="bdl-cart__footer-title">
            Shipping
            <span className="bdl-cart__footer-value">
              {" "}
              {formatCurrency(total.servicesSubTotal.price)}
            </span>
          </h5>
        </div>
      )} */}

      {/* {hasTax && (
        <div className="bdl-cart__footer-row">
          <h5 className="bdl-cart__footer-title">
            {taxSettings?.taxTitle}:
            <span className="bdl-cart__footer-value">
              {" "}
              {formatCurrency(total.tax.totalTaxAmount!)}
            </span>
          </h5>
        </div>
      )} */}
      <h4 className="bdl-cart__footer-row bdl-cart__footer-row_total">
        Total:{" "}
        <span className="bdl-cart__footer-value">{formatRupiah(totalPay)}</span>
      </h4>

      {hasDiscount && (
        <div className="bdl-cart__footer-rm">
          <small>
            <a
              href="#"
              className="bdl-cart__footer-rm-link"
              onClick={handleRmDiscount}
            >
              Remove Coupon
            </a>
          </small>
        </div>
      )}
    </div>
  );
}

interface ICartFooterProps {
  open: boolean;
  totalPay: number;
}
