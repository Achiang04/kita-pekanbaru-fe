import { ICharacteristic } from "./characteristic";

export interface IFilter {
  filter_id: number;
  title: string;
  is_default: boolean;
  created_at: string;
  fields: IFilterField[];
}
export interface IFilterField {
  field_id: number;
  filter_id: number;
  type: TFilterFieldType;
  characteristic_id?: number;
  sort: number;
  characteristic?: ICharacteristic;
}
export enum TFilterFieldType {
  category = "category",
  brand = "brand",
  price = "price",
  availability = "availability",
  characteristic = "characteristic",
}

// export type TFilterFieldType =
//   | "category"
//   | "brand"
//   | "price"
//   | "availability"
//   | "characteristic";
