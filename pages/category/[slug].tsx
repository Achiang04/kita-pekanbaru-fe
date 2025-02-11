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
  products,
} from "../../dummy/data";
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

  const onCollectionChange = async (newParams: TQuery) => {
    // TODO: Integrate to get data by sortby filter and pagination changes
    const filteredQuery = filterProductsQuery(newParams);
    // const { collection, filteredQuery } = await fetchCollection(
    //   category.category_id,
    //   newParams
    // );

    setShowModal(false);
    setCollection(collection);

    // This is for change the collection
    setProductsQuery(filteredQuery);

    changeUrl(router, filteredQuery);
  };

  useEffect(() => {
    if (isRouteChanging) setShowModal(false);
  }, [isRouteChanging]);

  useEffect(() => {
    setCollection(data.collection);
    setProductsQuery(data.productsQuery);
  }, [data]);

  const breadcrumbItems = useMemo(
    () =>
      makeBreadCrumbsFromCats(category.parents!, ({ category_id }) => ({
        isActive: category_id === category.category_id,
      })),
    [category.parents, category.category_id]
  );

  return (
    <MainLayout
      footerMenu={footerMenu}
      mainMenu={mainMenu}
      metaData={getCategoryMetaData(category)}
      title={category.seo.title}
      basicSettings={basicSettings}
    >
      <div className="container">
        <div className="row">
          <div className="category-sidebar__wrapper col-md-4 col-lg-3">
            <CategorySidebar category={category} />
            {category.filter &&
              Array.isArray(category.filter?.fields) &&
              category.filter.fields.length > 0 && (
                <FilterForm
                  filterFields={category.filter.fields}
                  queryParams={productsQuery}
                  categoryId={category.category_id}
                  onSearch={onCollectionChange}
                  idsPrefix="desk_"
                />
              )}
          </div>
          <div className="col-md-8 col-lg-9">
            <BreadCrumbs items={breadcrumbItems} />
            <h1 className="page-heading page-heading_h1 page-heading_m-h1">
              {category.title}
            </h1>
            {category.text?.description_top && (
              <div
                className={"mb-3"}
                dangerouslySetInnerHTML={{
                  __html: category.text.description_top,
                }}
              />
            )}

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
                  categoryId={category.category_id}
                />
                <Pagination
                  pagination={collection.pagination}
                  params={productsQuery}
                  onChange={onCollectionChange}
                />
              </>
            )}
            {category.text?.description_bottom && (
              <div
                dangerouslySetInnerHTML={{
                  __html: category.text.description_bottom,
                }}
              />
            )}
          </div>
        </div>
      </div>
      <FiltersModal show={showModal} setShow={setShowModal}>
        <CategorySidebar category={category} />
        {category.filter &&
          Array.isArray(category.filter?.fields) &&
          category.filter.fields.length > 0 && (
            <FilterForm
              filterFields={category.filter!.fields}
              queryParams={productsQuery}
              categoryId={category.category_id}
              onSearch={onCollectionChange}
              idsPrefix="mobile_"
            />
          )}
      </FiltersModal>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<
  ICategoryPageProps
> = async ({ req, params }) => {
  const menus = makeAllMenus({ categoryTree });

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
  category: ICategoryItem;
  collection: {
    products: IProduct[];
    pagination: IPagination;
  };
  productsQuery: { [key: string]: any };
  mainMenu: IMenuItem[];
  footerMenu: IMenuItem[];
  basicSettings: IBasicSettings;
}
