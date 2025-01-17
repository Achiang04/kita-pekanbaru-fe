import { ICharacteristic } from "./characteristic";
import { TFilterFieldType } from "./filter";
import { IProductManufacturer } from "./product";

export declare enum TGetProductsInStock {
  inStock = "1",
  outOfStock = "0",
}
export interface IGetProductsParams {
  product?: (string | number)[];
  category?: (number | string)[];
  collection?: number[] | string[];
  props?: {
    [key: number]: string | number | (string | number)[];
  };
  in_stock?: TGetProductsInStock;
  price_min?: number;
  price_max?: number;
  brand?: number[];
  text_search?: string;
  page?: number;
  cross_sell_category?: "related" | "similar";
  cross_sell_product?: number;
  removed?: "all" | "removed";
  published_status?: "all" | "hidden";
  "per-page"?: number;
  sort?: string;
}
export interface IGetCategoryTreeParams {
  menu?: "category";
  calc_products?: 0 | 1;
}
export interface IGetCategoryFlatParams {
  menu?: "category";
  calc_products?: 0 | 1;
  calc_children?: 0 | 1;
  parent?: number;
  brand?: number[];
  sort?: string;
}
export interface IGetCategoryItemParams {
  with_children?: string | number;
  with_siblings?: string | number;
  with_parents?: string | number;
  with_filter?: string | number;
}
export interface IGetFiltersParams {
  is_default?: 0 | 1;
}
export interface IFilterFieldsRequest {
  filter_fields: IFilterFieldRequest[];
  values?: IGetProductsParams;
}
export interface IFilterFieldsRangesResponse {
  ranges: IFilterFieldRange[];
  totalProducts: number;
}
export interface IFilterFieldRequest {
  type: TFilterFieldType;
  characteristic_id?: number | string;
}
export interface IFilterFieldRange {
  type: TFilterFieldType;
  range?: {
    min: string;
    max: string;
  };
  manufacturers?: (IProductManufacturer & {
    products_qty: number;
  })[];
  characteristic_id?: number;
  characteristic?: ICharacteristic;
}
