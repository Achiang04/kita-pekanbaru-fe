import { useEffect, useMemo, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { NextRouter, useRouter } from "next/router";
import { useAppSelector } from "../../hooks/redux";
import dynamic from "next/dynamic";
import { filterProductsQuery } from "../../lib/category";
import { getCategoryMetaData } from "../../lib/meta";
import { makeAllMenus } from "../../lib/menu";
import { IMenuItem } from "../../@types/components";
import { makeBreadCrumbsFromCats } from "../../lib/breadcrumbs";
import { IPagination, TQuery } from "../../@types/common";

import MainLayout from "../../layouts/Main";
import ProductsList from "../../components/ProductsList";
import Pagination from "../../components/Pagination";
import BreadCrumbs from "../../components/BreadCrumbs";
import CategorySidebar from "../../components/category/Sidebar";
import FiltersModal from "../../components/category/FiltersModal";
import CategoryControls from "../../components/category/Controls";
import { RootState } from "../../redux/store";
import { IBasicSettings } from "../../@types/settings";
import { createGetStr } from "../../utils/createGetStr";
import { ICategoryItem } from "../../@types/category";
import { IProduct } from "../../@types/product";
import {
  basicSettings,
  category,
  categoryTree,
  pagination,
} from "../../dummy/data";
import { Category, ListProdutData } from "../../@types/newTypes/newTypes";
import { getCategoriesDataById, getProductsData } from "../../lib/apiFunction";
const FilterForm = dynamic(() => import("../../components/FilterForm"), {
  ssr: false,
});

export default function CategoryPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { category, mainMenu, footerMenu, basicSettings } = data;
  const router = useRouter();
  const [productsQuery, setProductsQuery] = useState(data.productsQuery);
  const [collection, setCollection] = useState(data.collection);
  const [showModal, setShowModal] = useState(false);
  const isRouteChanging = useAppSelector(
    (state: RootState) => state.app.isRouteChanging
  );

  const filterData: (
    productData: ListProdutData[],
    sort: any
  ) => ListProdutData[] = (productData: ListProdutData[], sort: any) => {
    switch (sort) {
      case "title":
        return productData.sort((a, b) => a.name.localeCompare(b.name));
      case "-title":
        return productData.sort((a, b) => b.name.localeCompare(a.name));
      case "price":
        return productData.sort(
          (a, b) => a.priceLists[0].price - b.priceLists[0].price
        );
      case "-price":
        return productData.sort(
          (a, b) => b.priceLists[0].price - a.priceLists[0].price
        );
      default:
        return data.collection.products;
    }
  };

  const onCollectionChange = async (newParams: TQuery) => {
    const filteredData = filterData(collection.products, newParams.sort);
    setCollection({ ...collection, products: filteredData });
  };

  useEffect(() => {
    if (isRouteChanging) setShowModal(false);
  }, [isRouteChanging]);

  useEffect(() => {
    setCollection(data.collection);
    setProductsQuery(data.productsQuery);
  }, [data]);

  return (
    <MainLayout
      footerMenu={footerMenu}
      mainMenu={mainMenu}
      metaData={getCategoryMetaData(category)}
      title={category.name}
      basicSettings={basicSettings}
    >
      <div className="container">
        <div className="row">
          <div className="category-sidebar__wrapper col-md-4 col-lg-3">
            <CategorySidebar category={category} categoryList={mainMenu} />
            {/* {category.filter &&
              Array.isArray(category.filter?.fields) &&
              category.filter.fields.length > 0 && (
                <FilterForm
                  filterFields={category.filter.fields}
                  queryParams={productsQuery}
                  categoryId={category.category_id}
                  onSearch={onCollectionChange}
                  idsPrefix="desk_"
                />
              )} */}
          </div>
          <div className="col-md-8 col-lg-9">
            <BreadCrumbs items={category} />
            <h1 className="page-heading page-heading_h1 page-heading_m-h1">
              {category.name}
            </h1>
            {/* {category.text?.description_top && (
              <div
                className={"mb-3"}
                dangerouslySetInnerHTML={{
                  __html: category.text.description_top,
                }}
              />
            )} */}

            {collection && (
              <>
                <CategoryControls
                  params={productsQuery}
                  onSort={onCollectionChange}
                  onMobileShow={() => setShowModal(true)}
                />
                <ProductsList
                  products={collection.products}
                  query={productsQuery}
                  categoryId={category.id}
                />
                {/* <Pagination
                  pagination={collection.pagination}
                  params={productsQuery}
                  onChange={onCollectionChange}
                /> */}
              </>
            )}
            {/* {category.text?.description_bottom && (
              <div
                dangerouslySetInnerHTML={{
                  __html: category.text.description_bottom,
                }}
              />
            )} */}
          </div>
        </div>
      </div>
      <FiltersModal show={showModal} setShow={setShowModal}>
        <CategorySidebar category={category} categoryList={mainMenu} />
        {/* {category.filter &&
          Array.isArray(category.filter?.fields) &&
          category.filter.fields.length > 0 && (
            <FilterForm
              filterFields={category.filter!.fields}
              queryParams={productsQuery}
              categoryId={category.category_id}
              onSearch={onCollectionChange}
              idsPrefix="mobile_"
            />
          )} */}
      </FiltersModal>
    </MainLayout>
  );
}

const fetchProductData = async (id: string | undefined) => {
  const response = await getProductsData({
    categoryId: id,
  });
  let products: ListProdutData[];

  if (response.responseCode === "SUCCESS") {
    products = response.data.products;
  } else {
    products = [];
  }

  return products;
};

const fetchCategoryDataById = async (id: string) => {
  const response = await getCategoriesDataById(id);
  let category: Category;

  if (response.responseCode === "SUCCESS") {
    category = response.data;
  } else {
    category = { createdAt: "", id: "", name: "", updatedAt: "" };
  }

  return category;
};

export const getServerSideProps: GetServerSideProps<
  ICategoryPageProps
> = async ({ req, params }) => {
  const menus = await makeAllMenus({ categoryTree });

  const products = await fetchProductData(
    params ? `${params.slug}` : undefined
  );

  const category = await fetchCategoryDataById(params ? `${params.slug}` : "");

  const newData = {
    category,
    collection: {
      products,
      pagination,
    },
    productsQuery: {},
    ...menus,
    basicSettings,
  };

  return {
    props: {
      data: newData,
    },
  };
};

const changeUrl = (router: NextRouter, query: TQuery) => {
  const baseUrl = router.asPath.split("?")[0];
  router.push(`${baseUrl}?${createGetStr(query)}`, undefined, {
    shallow: true,
  }); //shallow to skip SSR of the page
};

interface ICategoryPageProps {
  data: ICategoryPageData;
}

interface ICategoryPageData {
  category: Category;
  collection: {
    products: ListProdutData[];
    pagination: IPagination;
  };
  productsQuery: { [key: string]: any };
  mainMenu: Category[];
  footerMenu: IMenuItem[];
  basicSettings: IBasicSettings;
}
