import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import OrderItems from "./OrderItems";
import Typography from "@mui/material/Typography";
import PayButton from "./PayButton";
import Loading from "./Loading";
import { detailedCartOrder } from "../../dummy/data";
import { IDetailedOrder } from "../../@types/order";
import { TPaymentGatewayAlias } from "../../@types/payment";

export default function OrderInfo({ ...restProps }: BoundlessOrderInfoProps) {
  return <OrderInfoComponent {...restProps} />;
}

export interface BoundlessOrderInfoProps {
  orderId: string;
  showItems?: boolean;
  showStatus?: boolean;
  showPayButton?: boolean;
  onError?: (error: any) => void;
}

const OrderInfoComponent = ({
  orderId,
  showItems = true,
  showPayButton = true,
  showStatus = true,
  onError,
}: Omit<BoundlessOrderInfoProps, "api">) => {
  const isInited = true;
  const [order, setOrder] = useState<IDetailedOrder | null>(null);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (isInited) {
      // TODO: Integrate get order detail with orderId
      setOrder(detailedCartOrder);
    }
  }, [isInited, onError, orderId]);

  if (!order || !isInited) return <Loading />;

  return (
    <div className="bdl-order-summary">
      {showPayButton &&
        !order.paid_at &&
        order.paymentMethod?.gateway_alias === TPaymentGatewayAlias.paypal && (
          <PayButton orderId={orderId} onError={onError} />
        )}
      {showStatus && (
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Order ID: {orderId}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Order status: {order.status?.title}
          </Typography>
          {order.paid_at && (
            <Typography variant="subtitle1" gutterBottom>
              Payment status: Paid
            </Typography>
          )}
        </div>
      )}
      <Paper>{showItems && <OrderItems order={order} />}</Paper>
    </div>
  );
};
