import { ICategoryItem } from "../@types/category";
import { Category, ListProdutData } from "../@types/newTypes/newTypes";
import { IProductItem } from "../@types/product";
import { getCanonicalCategoryUrl, getCanonicalProductUrl } from "./urls";

export const getProductMetaData = (product: ListProdutData) => {
  return {
    canonicalUrl: getCanonicalProductUrl(product),
    imgUrl: product.medias ? product.medias[0]?.fileUrl : null,
    description: product.description,
  };
};

export const getCategoryMetaData = (category: Category) => {
  if (!category) return {};

  return {
    canonicalUrl: getCanonicalCategoryUrl(category),
    imgUrl: null,
    description: category.name,
  };
};
