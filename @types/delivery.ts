import { ICustomer } from "./customer";
import { IOrderService } from "./order";

export interface IVWCountry {
  country_id: number;
  code: string;
  title: string;
}
export interface IDelivery {
  delivery_id: number;
  title: string | number;
  alias: string | null;
  shipping_id: number | null;
  shipping_config: {
    [key: string]: any;
  } | null;
  free_shipping_from: null | string;
  calc_method: TDeliveryCalcMethod | null;
  created_at: string;
  shipping?: IVwShipping | null;
  img: string | null;
  description: string | null;
}
export interface ICheckoutShippingPageData {
  shippingAddress: IAddress | null;
  billingAddress: IAddress | null;
  orderServiceDelivery: IOrderService | null;
  person: ICustomer;
  options: {
    delivery: IDelivery[];
    country: IVWCountry[];
  };
}
export enum TDeliveryCalcMethod {
  byShippingService = "byShippingService",
  byOwnRates = "byOwnRates",
  single = "single",
}
export enum TShippingAlias {
  selfPickup = "selfPickup",
}
export interface IVwShipping {
  shipping_id: number;
  shipping_title: string;
  alias: TShippingAlias | null;
  settings: null | {
    [key: string]: any;
  };
}
export interface IAddress {
  id: string;
  type: TAddressType | null;
  is_default: boolean;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  country_id: number | null;
  zip: string | null;
  phone: string | null;
  created_at: string;
  vwCountry: IVWCountry | null;
}
export enum TAddressType {
  shipping = "shipping",
  billing = "billing",
}
export type IAddressFields = Pick<
  IAddress,
  | "first_name"
  | "last_name"
  | "company"
  | "address_line_1"
  | "address_line_2"
  | "city"
  | "state"
  | "country_id"
  | "zip"
  | "phone"
>;

export interface ISetAddressesData {
  order_id: string;
  required_addresses?: TAddressType[];
  shipping_address?: IAddressFields;
  billing_address_the_same?: boolean;
  billing_address?: IAddressFields;
}
