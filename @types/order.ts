import { TPublishingStatus } from "./common";
import { ICustomer } from "./customer";
import { IDelivery } from "./delivery";
import { IItemPrice, IVwItem } from "./inventoryItem";
import { IPaymentMethod } from "./payment";
import { ITotal } from "./total";

export interface IOrder {
  id: string;
  status_id: null | number;
  payment_method_id: null | number;
  service_total_price: null | string;
  payment_mark_up: null | string;
  total_price: null | string;
  discount_for_order: null | string;
  tax_amount: null | string;
  paid_at: null | string;
  publishing_status: TPublishingStatus;
  created_at: string;
  customer?: ICustomer;
  discounts?: IOrderDiscount[];
  paymentMethod?: IPaymentMethod;
  services?: IOrderService[];
  tax_calculations: ITotal | null;
}
export interface IDetailedOrder
  extends Omit<IOrder, "customer" | "paymentMethod"> {
  order_id: number;
  items: IOrderItem[];
  props: {
    client_comment: string | null;
    custom_attrs: null | {
      [key: string]: any;
    };
  };
  discounts: IOrderDiscount[];
  customer: ICustomer | null;
  status: IOrderStatus | null;
  paymentMethod: IPaymentMethod | null;
  services: IOrderService[];
}
export interface IAdminOrderInList
  extends Omit<IOrder, "customer" | "paymentMethod"> {
  order_id: number;
  props: {
    client_comment: string | null;
    custom_attrs: null | {
      [key: string]: any;
    };
  };
  discounts: IOrderDiscount[];
  customer: ICustomer | null;
  status: IOrderStatus | null;
  paymentMethod: IPaymentMethod | null;
  services: IOrderService[];
}
export interface IOrderItem {
  reserve_item_id?: number;
  basket_item_id?: number;
  reserve_id?: number;
  stock_id?: number | null;
  item_id: number;
  qty: number;
  total_price?: string | null;
  item_price_id: number;
  created_at: string;
  itemPrice: IItemPrice;
  vwItem: IVwItem;
}
export interface IOrderService {
  order_service_id: number;
  service_id: number | null;
  qty: number;
  total_price: string | number;
  item_price_id: string | number;
  is_delivery: boolean;
  serviceDelivery?: IOrderServiceDelivery;
}
export interface IOrderServiceDelivery {
  delivery_id: number | null;
  title: string | null;
  text_info: string | null;
  data: {
    [key: string]: any;
  } | null;
  delivery?: IDelivery;
}
export enum TDiscountType {
  fixed = "fixed",
  percent = "percent",
}
export enum TDiscountSource {
  manual = "manual",
  coupon = "coupon",
}
export interface IOrderDiscount {
  discount_id: number;
  title: string | null;
  discount_type: TDiscountType | null;
  value: string;
  source: TDiscountSource | null;
  code_id: number | null;
  created_at?: string;
}
export enum TOrderStockLocation {
  inside = "inside",
  outside = "outside",
  basket = "basket",
}
export interface IOrderStatus {
  status_id: number;
  alias: string | null;
  title: string;
  background_color: string | null;
  stock_location: TOrderStockLocation;
  sort: number;
  created_at: string;
  deleted_at: null | string;
}
