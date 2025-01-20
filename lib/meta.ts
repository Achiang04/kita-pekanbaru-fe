import { ICategoryItem } from "../@types/category";
import { IProductItem } from "../@types/product";
import { getCanonicalCategoryUrl, getCanonicalProductUrl } from "./urls";

export const getProductMetaData = (product: IProductItem) => {
  return {
    canonicalUrl: getCanonicalProductUrl(product),
    imgUrl: product.images ? product.images[0].image.path : null,
    description: product.seo.metaDesc,
  };
};

export const getCategoryMetaData = (category: ICategoryItem) => {
  if (!category) return {};

  return {
    canonicalUrl: getCanonicalCategoryUrl(category),
    imgUrl: category.image ? category.image.path : null,
    description: category.seo.metaDesc,
  };
};
