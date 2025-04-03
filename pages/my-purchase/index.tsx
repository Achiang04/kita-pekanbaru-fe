import { useRouter } from "next/navigation";
import MainLayout from "../../layouts/Main";
import { GetServerSideProps } from "next";
import { makeAllMenus } from "../../lib/menu";
import { IMenuItem } from "../../@types/components";
import { categoryTree } from "../../dummy/data";
import OrderInfo from "../../components/orderComponents/OrderInfo";
import ProtectedLayout from "../../layouts/ProtectedLayout";
import { Category, OrderListItemType } from "../../@types/newTypes/newTypes";
import { useGetOrderItemQuery } from "../../services/cart";
import Grid from "@mui/material/Grid2";
import { Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import OrderRow from "../../components/orderComponents/OrderRow";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import StatusChip from "../../components/newComponent/StatusChip";

export default function DetailsPurchasePage({ mainMenu, footerMenu }: IProps) {
  const [orderData, setOrderData] = useState<OrderListItemType[]>([]);

  const { data } = useGetOrderItemQuery(undefined);

  const { formatRupiah } = useFormatCurrency();

  const router = useRouter();

  useEffect(() => {
    if (data) {
      const filteredData = data.map((val) => {
        return {
          orderItems: val.orderItems,
          id: val.id,
          redirectUrl: val.redirectUrl,
          total: val.total,
          status: val.status,
        };
      });

      setOrderData(filteredData);
    }
  }, [data]);

  // console.log(data);

  return (
    <ProtectedLayout>
      <MainLayout
        title={"Your Order"}
        mainMenu={mainMenu}
        footerMenu={footerMenu}
        noIndex
      >
        <div className={"container"}>
          <h1 className="page-heading page-heading_h1  page-heading_m-h1">
            Your Order
          </h1>
          {/* <OrderInfo orderId={`${router.query.id}`} /> */}
          <div className="bdl-order-summary">
            <Paper>
              <div className="bdl-order-items">
                <Grid container className="bdl-order-items__thead">
                  <Grid
                    size={{ xs: 12, sm: 1 }}
                    className="bdl-order-items__thead-cell"
                  >
                    No
                  </Grid>
                  <Grid
                    size={{ xs: 12, sm: 6 }}
                    sx={{ paddingTop: "16px", paddingBottom: "16px" }}
                  >
                    Product
                  </Grid>
                  <Grid
                    size={{ xs: 12, sm: 2 }}
                    className="bdl-order-items__thead-cell"
                  >
                    Price
                  </Grid>
                  <Grid
                    size={{ xs: 12, sm: 1 }}
                    className="bdl-order-items__thead-cell"
                  >
                    Qty
                  </Grid>
                  <Grid
                    size={{ xs: 12, sm: 2 }}
                    className="bdl-order-items__thead-cell"
                  >
                    Total
                  </Grid>
                </Grid>
                {orderData.map((val, index) => {
                  return (
                    <div
                      onClick={() => router.push(`/my-purchase/${val.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <Grid container key={val.id} className="bdl-order-item">
                        {val.orderItems.map((item, index2) => {
                          return (
                            <>
                              <Grid
                                size={{ xs: 0, sm: 1 }}
                                className="bdl-order-items__thead-cell"
                              >
                                {index2 === 0 ? index + 1 : ""}
                              </Grid>
                              <Grid
                                className="bdl-order-item__description-col"
                                size={{ sm: 6, xs: 12 }}
                              >
                                {item.product.medias ? (
                                  <div className="bdl-order-item__img">
                                    <img
                                      src={item.product.medias[0].fileUrl}
                                      width={200}
                                      height={200}
                                    />
                                  </div>
                                ) : (
                                  <div className="bdl-order-item__img no-image" />
                                )}
                                <div className="bdl-order-item__title">
                                  <div className="bdl-order-item__title-row">
                                    {item.product.name}
                                  </div>
                                </div>
                              </Grid>
                              <Grid
                                className="bdl-order-item__col"
                                size={{ sm: 2, xs: 12 }}
                              >
                                <span className="bdl-order-items__label">
                                  <strong>Price: </strong>
                                </span>
                                <span className="bdl-order-items__value">
                                  {formatRupiah(item.price)}
                                </span>
                              </Grid>
                              <Grid
                                className="bdl-order-item__col"
                                size={{ sm: 1, xs: 12 }}
                              >
                                <span className="bdl-order-items__label">
                                  <strong>QTY: </strong>
                                </span>
                                <span className="bdl-order-items__value">
                                  {item.qty}
                                </span>
                              </Grid>
                              <Grid
                                className="bdl-order-item__col"
                                size={{ sm: 2, xs: 12 }}
                              >
                                <span className="bdl-order-items__label">
                                  <strong>Total: </strong>
                                </span>
                                <span className="bdl-order-items__value">
                                  {formatRupiah(item.price * item.qty)}
                                </span>
                              </Grid>
                            </>
                          );
                        })}
                        <Grid
                          size={{ xs: 0, sm: 1 }}
                          className="bdl-order-items__thead-cell"
                        ></Grid>
                        <Grid
                          className="bdl-order-item__description-col"
                          size={{ sm: 5, xs: 12 }}
                        ></Grid>
                        <Grid
                          className="bdl-order-item__col"
                          size={{ sm: 0, xs: 12 }}
                        ></Grid>
                        <Grid
                          className="bdl-order-item__col"
                          size={{ sm: 3, xs: 12 }}
                        >
                          <span className="">
                            <StatusChip label={val.status} />
                          </span>
                        </Grid>
                        <Grid
                          className="bdl-order-item__col"
                          size={{ sm: 3, xs: 12 }}
                        >
                          <span className="">
                            <strong>
                              Total Pay: {formatRupiah(+val.total)}
                            </strong>
                          </span>
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </div>
            </Paper>
          </div>
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
