import { TQuery } from "../@types/common";
import { ICategory, ICategoryItem } from "../@types/category";
import { IProduct, IProductItem } from "../@types/product";
import { createGetStr } from "../utils/createGetStr";
import { Category, ListProdutData } from "../@types/newTypes/newTypes";

const CATEGORY_PREFIX = "/category";
const PRODUCTS_PREFIX = "/product";
const shopBaseUrl = process.env.BOUNDLESS_BASE_URL || "";

export const getCategoryUrl = (
  category: ICategoryUrlPartial,
  params?: TQuery
) => {
  const basePath =
    category.custom_link ||
    `${CATEGORY_PREFIX}/${category.url_key || category.category_id}`;
  const queryStr =
    params && Object.keys(params).length ? `?${createGetStr(params)}` : "";

  return `${basePath}${queryStr}`;
};

export const getCategoryItemUrl = (
  category: ICategoryItem,
  params?: TQuery
) => {
  const baseUrl =
    category.props?.custom_link ||
    `${CATEGORY_PREFIX}/${category.url_key || category.category_id}`;
  const queryStr =
    params && Object.keys(params).length ? `?${createGetStr(params)}` : "";

  return `${baseUrl}${queryStr}`;
};

export const getProductUrl = (product: IProductUrlProps, params?: TQuery) => {
  const basePath = `${PRODUCTS_PREFIX}/${
    product.url_key || product.product_id
  }`;
  const queryStr =
    params && Object.keys(params).length ? `?${createGetStr(params)}` : "";

  return `${basePath}${queryStr}`;
};

export const getProductItemUrl = (product: IProductItem, params?: TQuery) => {
  const basePath = `${PRODUCTS_PREFIX}/${
    product.url_key || product.product_id
  }`;
  const queryStr =
    params && Object.keys(params).length ? `?${createGetStr(params)}` : "";

  return `${basePath}${queryStr}`;
};

export const getCanonicalProductUrl = (product: ListProdutData) => {
  return `${shopBaseUrl}${product.name}`;
};

export const getCanonicalCategoryUrl = (category: Category) => {
  return `${shopBaseUrl}${category.name}`;
};

type IProductUrlProps = Pick<IProduct, "url_key" | "product_id">;
type ICategoryUrlPartial = Pick<
  ICategory,
  "url_key" | "category_id" | "custom_link"
>;
