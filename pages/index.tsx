import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ProductsList from "../components/ProductsList";
import MainLayout from "../layouts/Main";
import { makeAllMenus } from "../lib/menu";
import VerticalMenu from "../components/VerticalMenu";
import { IMenuItem } from "../@types/components";
import SwiperSlider from "../components/SwiperSlider";
import cliffImg from "../assets/cliff_1.jpg";
import cliff2Img from "../assets/cliff_2.jpg";
import CoverTextInCenter from "../components/CoverTextInCenter";
import bgImg from "../assets/cover-bg.jpeg";
import bgPortraitImg from "../assets/cover-bg-portrait.jpg";
import ProductsSliderByQuery from "../components/ProductsSliderByQuery";
import { IBasicSettings } from "../@types/settings";
import { IProduct } from "../@types/product";
import { basicSettings, products, categoryTree } from "../dummy/data";
import { useGetNotificationsQuery } from "../services/media";
import { Category, ListProdutData } from "../@types/newTypes/newTypes";
import { getProductsData } from "../lib/apiFunction";

export default function IndexPage({
  products,
  mainMenu,
  footerMenu,
  basicSettings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <MainLayout
      mainMenu={mainMenu}
      footerMenu={footerMenu}
      basicSettings={basicSettings}
    >
      <div className="container">
        <MainPageSlider />
        <div className="row">
          <nav className="col-lg-3 d-none d-lg-block">
            {mainMenu && <VerticalMenu menuList={mainMenu} />}
          </nav>
          <div className="col-lg-9 col-md-12">
            <h1 className="page-heading page-heading_h1 page-heading_m-h1">
              Boundless store
            </h1>
            <ProductsList products={products} query={{}} />
          </div>
        </div>
        {/* <div className="container">
          <h2 className="page-heading page-heading_h1 page-heading_m-h1">
            Cover example:
          </h2>
        </div> */}
      </div>
      {/* <CoverTextInCenter
        showChevronDown
        img={bgImg.src}
        imgPortrait={bgPortraitImg.src}
        content={{
          intro: "Intro",
          head: "Main header",
          subHead: "subheader",
        }}
        shadow={{
          opacity: 0.5,
          backgroundColor: "#000",
        }}
        link={"http://google.com"}
      /> */}
      {/* <div className="container">
        <h2 className="page-heading page-heading_h1 page-heading_m-h1">
          Products carousel:
        </h2>
        <ProductsSliderByQuery
          query={{ collection: ["main-page"], sort: "in_collection" }}
          title={"Collection title"}
          wrapperClassName="page-block"
        />
      </div> */}
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<
  IIndexPageProps
> = async () => {
  const menus = await makeAllMenus({ categoryTree });

  const response = await getProductsData({});
  let products: ListProdutData[];

  if (response.responseCode === "SUCCESS") {
    products = response.data.products;
  } else {
    products = [];
  }

  return {
    props: {
      products,
      basicSettings,
      ...menus,
    },
  };
};

interface IIndexPageProps {
  products: ListProdutData[];
  mainMenu: Category[];
  footerMenu: IMenuItem[];
  basicSettings: IBasicSettings;
}

function MainPageSlider() {
  const slides = [
    {
      img: cliffImg.src,
      link: "",
      caption:
        "Three things cannot be long hidden: The Sun, The Moon, and The Truth.",
      captionPosition: "center",
      useFilling: true,
      fillingColor: "#000000",
      fillingOpacity: 0.4,
    },
    {
      img: cliff2Img.src,
      link: "",
      caption: "Pray not for easy lives, pray to be stronger men.",
      captionPosition: null,
      useFilling: true,
      fillingColor: "#000000",
      fillingOpacity: 0.4,
    },
  ];

  return (
    <SwiperSlider
      showPrevNext
      roundCorners
      pagination="progressbar"
      size={"large"}
      slides={slides}
      className={"mb-4"}
    />
  );
}
