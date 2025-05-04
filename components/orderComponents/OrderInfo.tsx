import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import OrderItems from "./OrderItems";
import Typography from "@mui/material/Typography";
import PayButton from "./PayButton";
import Loading from "./Loading";
import { detailedCartOrder } from "../../dummy/data";
import { IDetailedOrder } from "../../@types/order";
import { TPaymentGatewayAlias } from "../../@types/payment";
import { useGetOrderItemByIdQuery } from "../../services/cart";
import { OrderItemType } from "../../@types/newTypes/newTypes";

export default function OrderInfo({ ...restProps }: BoundlessOrderInfoProps) {
  return <OrderInfoComponent {...restProps} />;
}

export interface BoundlessOrderInfoProps {
  orderId: string;
  showItems?: boolean;
  showStatus?: boolean;
  showPayButton?: boolean;
  onError?: (error: any) => void;
  data: OrderItemType | undefined;
}

const OrderInfoComponent = ({
  orderId,
  data,
}: Omit<BoundlessOrderInfoProps, "api">) => {
  const isInited = true;
  const [order, setOrder] = useState<OrderItemType | null>(null);

  useEffect(() => {
    if (data) {
      setOrder(data);
    }
  }, [isInited, data]);

  if (!order || !isInited) return <Loading />;

  return (
    <div className="bdl-order-summary">
      {order.status === "WAITING_PAYMENT" && (
        <PayButton url={order.redirectUrl} />
      )}

      <div>
        <Typography variant="subtitle1" gutterBottom>
          Order ID: {orderId}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Order status: {order.status}
        </Typography>
        {order.shippingSerialNumber.length > 0 && (
          <Typography variant="subtitle1" gutterBottom>
            shippingSerialNumber: {order.shippingSerialNumber}
          </Typography>
        )}
        {order.status === "DONE" && (
          <Typography variant="subtitle1" gutterBottom>
            Payment status: Paid
          </Typography>
        )}
      </div>

      <Paper>
        <OrderItems order={order} />
      </Paper>
    </div>
  );
};
