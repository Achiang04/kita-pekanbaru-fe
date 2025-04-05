import { useRouter } from "next/router";
import MainLayout from "../../layouts/Main";
import { GetServerSideProps } from "next";
import { makeAllMenus } from "../../lib/menu";
import { IMenuItem } from "../../@types/components";
import { categoryTree } from "../../dummy/data";
import OrderInfo from "../../components/orderComponents/OrderInfo";
import ProtectedLayout from "../../layouts/ProtectedLayout";
import { Category } from "../../@types/newTypes/newTypes";
import { useGetOrderItemByIdQuery } from "../../services/cart";

export default function DetailsPurchasePage({ mainMenu, footerMenu }: IProps) {
  const router = useRouter();

  if (!router.query.id) {
    return null;
  }

  const { data } = useGetOrderItemByIdQuery({ id: router.query.id as string });

  return (
    <ProtectedLayout>
      <MainLayout
        title={"Thank you for your order!"}
        mainMenu={mainMenu}
        footerMenu={footerMenu}
        noIndex
      >
        <div className={"container"}>
          <h1 className="page-heading page-heading_h1  page-heading_m-h1">
            {data?.status === "DONE" && "Thank you for your order!"}
            {data?.status === "WAITING_PAYMENT" && "Please pay your item"}
            {data?.status === "POSTED" && "Your payment on process"}
          </h1>
          <OrderInfo orderId={`${router.query.id}`} data={data} />
        </div>
      </MainLayout>
    </ProtectedLayout>
  );
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  // TODO: Integrate get menu data
  const { mainMenu, footerMenu } = await makeAllMenus({ categoryTree });

  return {
    props: {
      mainMenu,
      footerMenu,
    },
  };
};

interface IProps {
  mainMenu: Category[];
  footerMenu: IMenuItem[];
}
