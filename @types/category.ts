import { TPublishingStatus } from "./common";
import { IFilter } from "./filter";
import { IImageItem } from "./image";
import { IItemSeo } from "./product";

export interface ICategory {
  category_id: number;
  parent_id: number | null;
  title: string;
  url_key: string | null;
  tree_sort: string | null;
  level: number;
  image?: IImageItem | null;
  custom_link: string | null;
  children?: ICategory[] | null;
}
export interface ICategoryItem {
  category_id: number;
  title: string;
  url_key?: string | null;
  parent_id: number | null;
  external_id: string | null;
  products_qty?: number;
  text: ICategoryText | null;
  props?: ICategoryProps | null;
  image?: IImageItem | null;
  children?: ICategoryFlatItem[];
  siblings?: ICategoryFlatItem[];
  parents?: ICategoryFlatItem[];
  filter?: IFilter;
  seo: IItemSeo;
  status: TPublishingStatus;
  created_by: number | null;
  created_at: string;
  deleted_at?: string | null;
  sort: number;
}
export interface ICategoryFlatItem {
  category_id: number;
  parent_id: number | null;
  title: string;
  url_key: string | null;
  level: number;
  tree_sort: string;
  joined_title: string | null;
  image?: IImageItem | null;
  custom_link: string | null;
  products_qty?: number;
  children_qty?: number;
}
interface ICategoryText {
  custom_title: string | null;
  meta_description: string | null;
  description_top: string | null;
  description_bottom: string | null;
}
interface ICategoryProps {
  use_filter: boolean;
  filter_id: number | null;
  custom_link: string | null;
  arbitrary_data: {
    [key: string]: any;
  } | null;
}
export interface IProductCategoryRels {
  is_default: boolean;
  category: ICategoryItem;
}

export type ICategoryPartial = Pick<
  ICategory,
  "category_id" | "title" | "custom_link" | "url_key" | "image"
> & { children?: ICategory[] | null };
