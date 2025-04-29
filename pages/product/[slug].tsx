import { useEffect, useMemo, useState } from "react";

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import MainLayout from "../../layouts/Main";
import { useRouter } from "next/router";
import BreadCrumbs from "../../components/BreadCrumbs";
import ProductImages from "../../components/product/Images";
import qs, { ParsedQs } from "qs";
import MetaSchemaOrg from "../../components/product/MetaSchemaOrg";
import { getProductMetaData } from "../../lib/meta";
import ProductLabels from "../../components/product/Labels";
import ProductVariantAndBuy from "../../components/product/VariantAndBuy";
import ProductCharacteristics from "../../components/product/Characteristics";
import { makeAllMenus } from "../../lib/menu";
import { makeBreadCrumbsFromCats } from "../../lib/breadcrumbs";
import ProductShipping from "../../components/product/Shipping";
import { IMenuItem } from "../../@types/components";
import ProductsSliderByQuery from "../../components/ProductsSliderByQuery";
import { IBasicSettings } from "../../@types/settings";
import { IGetProductsParams } from "../../@types/catalog";
import { IProductItem } from "../../@types/product";
import { ICategoryFlatItem } from "../../@types/category";
import {
  basicSettings,
  categoryParent,
  categoryTree,
  products,
} from "../../dummy/data";
import { Category, ListProdutData } from "../../@types/newTypes/newTypes";
import { getProductDataById } from "../../lib/apiFunction";

export default function ProductPage({
  data: { product, categoryParents, mainMenu, footerMenu, basicSettings },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [resolvedParents, setResolvedParents] = useState(categoryParents);
  const router = useRouter();
  const query = useMemo<ParsedQs>(
    () => qs.parse(router.asPath.split("?")[1] || ""),
    [router.asPath]
  );
  const { category, ...restQuery } = query;
  // const similarQuery = useMemo(
  //   () => ({
  //     cross_sell_category: "similar",
  //     cross_sell_product: product.product_id,
  //   }),
  //   [product]
  // );
  // const relatedQuery = useMemo(
  //   () => ({
  //     cross_sell_category: "related",
  //     cross_sell_product: product.product_id,
  //   }),
  //   [product]
  // );

  const fetchParents = async (categoryId: number) => {
    // TODO: Integrate to get parent data of the product (this is for showing breadcrumbs)
    setResolvedParents(categoryParent);
  };

  // useEffect(() => {
  //   const categoryId = category ? parseInt(category as string) : null;
  //   if (!categoryId) return;

  //   const notDefaultCat = product.categoryRels.some(
  //     (cat) =>
  //       cat.is_default !== true && cat.category.category_id === categoryId
  //   );

  //   if (notDefaultCat) {
  //     fetchParents(categoryId);
  //   }
  // }, [category, product]);

  return (
    <MainLayout
      footerMenu={footerMenu}
      mainMenu={mainMenu}
      metaData={getProductMetaData(product)}
      title={product.name}
      basicSettings={basicSettings}
    >
      <div className={"container"}>
        <BreadCrumbs items={product.category} product={product} />
        <div className="product-page" itemScope itemType="//schema.org/Product">
          <div className="row">
            <div className="col-md-7">
              <h1 className="mb-4 product-page__header" itemProp="name">
                {product.name}
              </h1>
              {/* <ProductLabels labels={product.labels} className={"mb-3"} /> */}
              <ProductImages product={product} />
            </div>
            <div className="col-md-5">
              <ProductVariantAndBuy product={product} />
              <hr className="product-page__hr" />
              <ProductCharacteristics product={product} />
              {/* <hr className="product-page__hr" />
              <ProductShipping /> */}
            </div>
          </div>
          {product.description && (
            <article
              itemProp="description"
              style={{ whiteSpace: "pre-line" }}
              className={"product-page__description"}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
          {/* <MetaSchemaOrg product={product} parents={resolvedParents} /> */}
        </div>
        {/* <ProductsSliderByQuery
          query={similarQuery as IGetProductsParams}
          title="Similar products"
          wrapperClassName="page-block"
        />
        <ProductsSliderByQuery
          query={relatedQuery as IGetProductsParams}
          title="Frequently Bought Together"
          wrapperClassName="page-block"
        /> */}
      </div>
    </MainLayout>
  );
}

const fetchProductData = async (id: string) => {
  const response = await getProductDataById(id);
  let product: ListProdutData;

  if (response.responseCode === "SUCCESS") {
    product = response.data;
  } else {
    product = {
      id: "",
      name: "",
      description: "",
      category: {
        id: "",
        name: "",
      },
      priceLists: [],
      medias: [],
      stock: 0,
    };
  }

  return product;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: {
      slug: product.url_key || String(product.product_id),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<IProductPageProps> = async ({
  params,
}) => {
  const menus = await makeAllMenus({ categoryTree });

  const product = await fetchProductData(params ? `${params.slug}` : "");

  const newData = {
    product,
    categoryParents: categoryParent,
    ...menus,
    basicSettings,
  };

  return {
    props: {
      data: newData,
    },
  };
};

interface IProductPageProps {
  data: IProductPageData;
}

interface IProductPageData {
  product: ListProdutData;
  categoryParents: ICategoryFlatItem[] | null;
  mainMenu: Category[];
  footerMenu: IMenuItem[];
  basicSettings: IBasicSettings;
}
