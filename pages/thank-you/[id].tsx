import { useRouter } from "next/router";
import MainLayout from "../../layouts/Main";
import { GetServerSideProps } from "next";
import { makeAllMenus } from "../../lib/menu";
import { IMenuItem } from "../../@types/components";
import { categoryTree } from "../../dummy/data";
import OrderInfo from "../../components/orderComponents/OrderInfo";

export default function ThankYouPage({ mainMenu, footerMenu }: IProps) {
  const router = useRouter();

  if (!router.query.id) {
    return null;
  }

  return (
    <MainLayout
      title={"Thank you for your order!"}
      mainMenu={mainMenu}
      footerMenu={footerMenu}
      noIndex
    >
      <div className={"container"}>
        <h1 className="page-heading page-heading_h1  page-heading_m-h1">
          Thank you for your order!
        </h1>
        <OrderInfo orderId={`${router.query.id}`} />
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  // TODO: Integrate get menu data
  const { mainMenu, footerMenu } = makeAllMenus({ categoryTree });

  return {
    props: {
      mainMenu,
      footerMenu,
    },
  };
};

interface IProps {
  mainMenu: IMenuItem[];
  footerMenu: IMenuItem[];
}
