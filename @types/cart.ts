import { IItemPrice, IVwItem } from "./inventoryItem";

export interface ICartInfo {
  id: string;
  created_at: string;
  total: ICartTotal;
}
export interface ICartTotal {
  qty: number;
  total: string;
}
export interface ICart {
  cart: ICartInfo;
  items: ICartItem[];
}
export interface ICartItem {
  basket_item_id: number;
  item_id: number;
  qty: number;
  item_price_id: number;
  created_at: string;
  itemPrice: IItemPrice;
  vwItem: IVwItem;
}
