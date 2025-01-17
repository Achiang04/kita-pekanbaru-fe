import { TDiscountType } from "./order";
import { TTaxStatus } from "./product";
import { ISystemTax } from "./settings";

export interface IItem {
  id: number;
  price: string;
  qty: number;
  taxStatus: TTaxStatus;
  taxClassId: number | null;
}
export interface IItemWithTaxes extends IItem {
  taxBase: string;
  itemTaxes?: string;
  appliedTaxes?: IAppliedTax[];
}
export interface IItemsTotal {
  price: string;
  qty: number;
}
export interface IDiscountRow {
  type: TDiscountType;
  value: number;
}
export interface ICustomerLocation {
  country_id: number;
  state?: string;
  zip?: string;
}
export interface IAppliedTax {
  tax_rate_id: number;
  base: string;
  rate: string;
  taxValue: string;
}
export interface ITaxCalculated {
  totalTaxAmount: string | null;
  itemsWithTax: IItemWithTaxes[];
  mode?: "addToTotal" | "alreadyInTotal";
  shipping?: {
    shippingTaxes: string;
    appliedTaxes: IAppliedTax[];
  };
}
export interface ITotal {
  itemsSubTotal: IItemsTotal;
  price: string;
  discount: string;
  paymentMarkUp: string;
  tax: ITaxCalculated;
  taxSettings: ISystemTax;
  servicesSubTotal: {
    price: string;
    qty: number;
  };
}
